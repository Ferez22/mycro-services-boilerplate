# Base image
FROM python:3.11-slim as base
WORKDIR /app

# Install Poetry
RUN pip install --no-cache-dir poetry

# Copy dependency files
COPY pyproject.toml poetry.lock* ./

# Disable virtualenvs: install system-wide
RUN poetry config virtualenvs.create false

# Development stage
FROM base as dev
ENV PYTHONUNBUFFERED=1
COPY . .
# Install all dependencies (main + dev)
RUN poetry install
EXPOSE 8000
CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5000", "--reload"]

# Production build stage
FROM base as builder
COPY . .
# Install only runtime deps (no dev)
RUN poetry install --only=main

# Production runtime stage
FROM python:3.11-slim as prod
WORKDIR /app

# Install Poetry in production stage
RUN pip install --no-cache-dir poetry

# Copy dependency files
COPY pyproject.toml poetry.lock* ./

# Disable virtualenvs: install system-wide
RUN poetry config virtualenvs.create false

# Install only runtime dependencies
RUN poetry install --only=main

# Copy application code
COPY . .

# Create a non-root user
RUN adduser --system appuser
USER appuser

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5000"]