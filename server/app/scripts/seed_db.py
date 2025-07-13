import os
import random
from datetime import datetime, timedelta, timezone

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.models import DashboardSummary, Metric, User, db


def seed_db():
    DATABASE_URL = os.getenv("DATABASE_URL")
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL environment variable not set.")

    engine = create_engine(DATABASE_URL)
    Session = sessionmaker(bind=engine)
    session = Session()

    try:
        # Clear existing data (optional, for re-seeding)
        session.query(DashboardSummary).delete()
        session.query(Metric).delete()
        session.query(User).delete()

        # Insert dummy data for dashboard_summary (remains static for this example)
        summary_data = DashboardSummary(
            views="721K",
            views_change="11.02%",
            views_type="increase",
            visits="367K",
            visits_change="0.03%",
            visits_type="decrease",
            new_users="1,156",
            new_users_change="15.03%",
            new_users_type="increase",
            active_users="239K",
            active_users_change="6.08%",
            active_users_type="increase",
        )
        session.add(summary_data)

        # Generate raw metrics data for the last 30 days (reduced for dev)
        end_date = datetime.now(timezone.utc)
        # 30 days for faster seeding
        start_date = end_date - timedelta(days=30)

        devices = ["Windows", "Mac", "iOS", "Android", "Linux", "Other"]
        locations = ["United States", "Canada", "Mexico", "Other"]
        event_types = ["page_view", "user_login", "new_registration"]

        BATCH_SIZE = 10000
        metrics_to_add = []
        count = 0
        current_date = start_date
        while current_date <= end_date:
            # Simulate daily events (reduced for dev)
            num_page_views = random.randint(1000, 3000)
            num_user_logins = random.randint(50, 150)
            num_new_registrations = random.randint(2, 10)

            for _ in range(num_page_views):
                metrics_to_add.append(
                    Metric(
                        timestamp=current_date
                        + timedelta(minutes=random.randint(0, 1440)),
                        event_type="page_view",
                        device=random.choice(devices),
                        location=random.choice(locations),
                    )
                )
                count += 1
                if count % BATCH_SIZE == 0:
                    session.add_all(metrics_to_add)
                    session.commit()
                    metrics_to_add = []
                    print(f"Inserted {count} metrics...")
            for _ in range(num_user_logins):
                metrics_to_add.append(
                    Metric(
                        timestamp=current_date
                        + timedelta(minutes=random.randint(0, 1440)),
                        event_type="user_login",
                        device=random.choice(devices),
                        location=random.choice(locations),
                    )
                )
                count += 1
                if count % BATCH_SIZE == 0:
                    session.add_all(metrics_to_add)
                    session.commit()
                    metrics_to_add = []
                    print(f"Inserted {count} metrics...")
            for _ in range(num_new_registrations):
                metrics_to_add.append(
                    Metric(
                        timestamp=current_date
                        + timedelta(minutes=random.randint(0, 1440)),
                        event_type="new_registration",
                        device=random.choice(devices),
                        location=random.choice(locations),
                    )
                )
                count += 1
                if count % BATCH_SIZE == 0:
                    session.add_all(metrics_to_add)
                    session.commit()
                    metrics_to_add = []
                    print(f"Inserted {count} metrics...")
            current_date += timedelta(days=1)

        # Final commit for any remaining
        if metrics_to_add:
            session.add_all(metrics_to_add)
            session.commit()
            print(f"Inserted {count} metrics (final batch).")
        session.commit()
        print("Database seeded successfully with dummy raw metrics data.")

    except Exception as e:
        session.rollback()
        print(f"Error while seeding data: {e}")
    finally:
        exit()
        session.close()
