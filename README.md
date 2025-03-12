# Seasons Logistics App

## Table of Contents

- [Endpoints](#endpoints)
- [Setup Guide](#setup-guide)
- [Need to reset your PostgreSQL database?](#need-to-reset-your-postgresql-database)
- [Installing Pre-commit](#installing-pre-commit)

## Endpoints

### React/Typescript with Next.js: [localhost:3000](http://localhost:3000/)

### FastAPI: [localhost:8000](http://localhost:8000/)

### pgAdmin: [localhost:8082](http://localhost:80820/)

## Setup Guide

### 1. Get Docker [here](https://docs.docker.com/get-docker/) or using your terminal:

- **MacOS**

        brew install --cask docker

- **Windows**

       winget install Docker.DockerDesktop

### 2. Run the Docker Application

### 3. Clone this repository into a \<local directory> and navigate into the \<local directory>.

```
cd <projects folder>
md <local directory>
git clone <git repo link>
cd <local directory>
```

### 4. Create the necessary Docker volume

```
docker volume create pg_logistics_data
docker volume create pg-admin_data
```

### 5. Build your Docker images

```
docker compose -f docker-compose.dev.yml build
```

### 6. Spin up your Docker containers

```
docker compose -f docker-compose.dev.yml up
```

### 7. ONE-TIME: Run initial database migrations within API container terminal/exec

```
alembic upgrade head
```

### 8. The GHI is accessible at [localhost:3000](http://localhost:3000/)

### 9. The API is accessible at [localhost:8000/docs](http://localhost:8000/docs)

## Need to reset your PostgreSQL database?

### 1. Stop all running Docker services/containers

### 2. Prune your Docker containers

```
docker container prune -f
```

### 3. Delete your existing volumes

```
docker volume rm pg_logistics_data
docker volume rm pg-admin_data
```

### 4. Recreate the necessary volumes

```
docker volume create pg_logistics_data
docker volume create pg-admin_data
```

### 5. Restart your Docker containers

```
docker compose -f docker-compose.dev.yml up
```

### 6. Run initial database migrations within API container terminal/exec

```
alembic upgrade head
```

## Installing Pre-commit

#### Instructions from https://pre-commit.com/

### 1. Install Pre-commit

- Using pip:

        pip install pre-commit

- In a python project, add the following to your requirements.txt (or
  requirements-dev.txt):

        pre-commit

- As a 0-dependency zipapp:

  - locate and download the .pyz file from the github releases
  - run python pre-commit-#.#.#.pyz ... in place of pre-commit ...

- Using homebrew:

        brew install pre-commit

- Using conda (via conda-forge):

        conda install -c conda-forge pre-commit

### 2. Install the git hook scripts

- run `pre-commit install` to set up the git hook scripts

### 3. Now pre-commit will run automatically on git commit!
