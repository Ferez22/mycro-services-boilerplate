# Base image
FROM python:3.11-slim as base
WORKDIR /app

# Install Poetry
RUN pip install poetry

# Copy dependency files
COPY pyproject.toml poetry.lock* ./

# Default: no venv, install inside system
RUN poetry config virtualenvs.create false


# Development stage
FROM base as dev
ENV PYTHONUNBUFFERED=1
COPY . .
# Install all dependencies (main + dev)
RUN poetry install
EXPOSE 8000
CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]


# Production build stage
FROM base as builder
# Install only runtime deps (no dev)
RUN poetry install --no-root --only main
COPY . .


# Production runtime stage
FROM python:3.11-slim as prod
WORKDIR /app

# Create a non-root user
RUN adduser --system appuser
USER appuser

# Copy installed deps and code
COPY --from=builder /app /app

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]