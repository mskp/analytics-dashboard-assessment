# Database Migrations Guide

This project uses Alembic for database migrations. Alembic is a database migration tool for SQLAlchemy.

## Setup

1. Install dependencies:
```bash
poetry install
```

2. Initialize Alembic (first time only):
```bash
cd server
alembic init migrations
```

## Migration Commands

### Generate a new migration
```bash
# Auto-generate migration based on model changes
alembic revision --autogenerate -m "Description of changes"

# Create empty migration file
alembic revision -m "Description of changes"
```

### Apply migrations
```bash
# Apply all pending migrations
alembic upgrade head

# Apply specific migration
alembic upgrade <revision_id>

# Apply one migration forward
alembic upgrade +1
```

### Rollback migrations
```bash
# Rollback to previous migration
alembic downgrade -1

# Rollback to specific migration
alembic downgrade <revision_id>

# Rollback all migrations
alembic downgrade base
```

### Check migration status
```bash
# Show current migration status
alembic current

# Show migration history
alembic history

# Show pending migrations
alembic show <revision_id>
```

## Workflow

1. **Make model changes** in your SQLAlchemy models
2. **Generate migration**: `alembic revision --autogenerate -m "Add new column"`
3. **Review the generated migration** in `migrations/versions/`
4. **Apply migration**: `alembic upgrade head`
5. **Test your changes**

## Environment Variables

Make sure your `.env` file contains:
```
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

## Common Scenarios

### Adding a new table
1. Create the model in `app/models/`
2. Import it in `migrations/env.py`
3. Generate migration: `alembic revision --autogenerate -m "Add new table"`
4. Apply: `alembic upgrade head`

### Adding a column
1. Add the column to your model
2. Generate migration: `alembic revision --autogenerate -m "Add column"`
3. Apply: `alembic upgrade head`

### Modifying a column
1. Update the column definition in your model
2. Generate migration: `alembic revision --autogenerate -m "Modify column"`
3. Apply: `alembic upgrade head`

## Troubleshooting

### Migration conflicts
If you have conflicts between migrations:
1. Check the migration history: `alembic history`
2. Resolve conflicts manually in the migration files
3. Test with: `alembic upgrade head`

### Database out of sync
If your database is out of sync with migrations:
1. Check current state: `alembic current`
2. Reset if needed: `alembic stamp head`
3. Or recreate: `alembic upgrade head`

### Auto-generation issues
If auto-generation doesn't detect changes:
1. Make sure models are imported in `migrations/env.py`
2. Check that `target_metadata = Base.metadata` is set
3. Verify model changes are saved

## Best Practices

1. **Always review auto-generated migrations** before applying
2. **Use descriptive migration messages**
3. **Test migrations on development data first**
4. **Backup production database before applying migrations**
5. **Keep migrations in version control**
6. **Don't modify existing migration files** (create new ones instead)

## Example Migration Workflow

```bash
# 1. Make changes to models
# Edit app/models/user.py

# 2. Generate migration
alembic revision --autogenerate -m "Add user profile fields"

# 3. Review generated migration
# Check migrations/versions/xxxx_add_user_profile_fields.py

# 4. Apply migration
alembic upgrade head

# 5. Verify changes
alembic current
``` 