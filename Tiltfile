version_settings(constraint='>=0.36.3')

APPS = ["api", "web", "auth"]

# Setup namespace and role first
k8s_yaml([
    'infrastructure/k8s/app.namespace.yaml',
    'infrastructure/k8s/app.role.yaml',
])

# Build workspace packages first
local_resource(
    'build-packages',
    cmd='pnpm turbo build:packages',
    ignore=['packages/**/.turbo/**', 'packages/**/dist/**'],
    labels=['builds']
)

# Create GHCR secret from environment variables using kubectl
local_resource(
    'ghcr-secret',
    cmd='''kubectl create secret docker-registry ghcr-secret \
        --dry-run=client \
        --docker-server=ghcr.io \
        --docker-username=$GITHUB_USERNAME \
        --docker-password=$GITHUB_TOKEN \
        --docker-email=$GITHUB_EMAIL \
        --namespace=app \
        -o yaml | kubectl apply -f -''',
    labels=['secrets']
)

# api
docker_build(
    ref="ghcr.io/awwwkshay/node-ts-api-starter", 
    context=".",
    dockerfile="./apps/api/Dockerfile",
    live_update=[
        sync("./apps/api/src/", "/app/apps/api/src"),
        run(
            "pnpm install",
            trigger=["./apps/api/package.json", "./apps/api/pnpm-lock.yaml"],
        )
    ],
    only=[
        "./apps/api", 
        "./pnpm-workspace.yaml", 
        "./pnpm-lock.yaml", 
        "./package.json",
        "./packages",
    ],
    target="development"
)

k8s_yaml([
    'infrastructure/k8s/api/api.depl.yaml',
    'infrastructure/k8s/api/api.service.yaml',
    'infrastructure/k8s/api/api.config.yaml',
    'infrastructure/k8s/api/api.secret.yaml',
    'infrastructure/k8s/api/api.job.yaml',
    ])

k8s_resource(
   'api-deployment',
    port_forwards=['8000:8000','9000:9229'],
    resource_deps=['build-packages', 'ghcr-secret'],
    labels=['apps']
)

k8s_resource(
    'api-job',
    resource_deps=['build-packages', 'ghcr-secret'],
    labels=['jobs']
)

# web
docker_build(
    ref="ghcr.io/awwwkshay/node-ts-web-starter",
    context=".",
    dockerfile="./apps/web/Dockerfile",
    live_update=[
        sync("./apps/web/src/", "/app/apps/web/src"),
        sync("./apps/web/public/", "/app/apps/web/public"),
        run(
            "pnpm install",
            trigger=["./apps/web/package.json", "./apps/web/pnpm-lock.yaml"],
        )
    ],
    only=[
        "./apps/web", 
        "./pnpm-workspace.yaml", 
        "./pnpm-lock.yaml", 
        "./package.json",
        "./packages",
    ],
    target="development"
)

k8s_yaml([  
    'infrastructure/k8s/web/web.depl.yaml',
    'infrastructure/k8s/web/web.service.yaml',
    'infrastructure/k8s/web/web.config.yaml',
    'infrastructure/k8s/web/web.secret.yaml',
    ])

k8s_resource(
    'web-deployment',
    port_forwards=['3000:3000','9001:9229'],
    resource_deps=['build-packages', 'ghcr-secret'],
    labels=['apps']
)

# auth
docker_build(
    ref="ghcr.io/awwwkshay/node-ts-auth-starter",
    context=".",
    dockerfile="./apps/auth/Dockerfile",
    live_update=[
        sync("./apps/auth/src/", "/app/apps/auth/src"),
        run(
            "pnpm install",
            trigger=["./apps/auth/package.json", "./apps/auth/pnpm-lock.yaml"],
        )
    ],
    only=[
        "./apps/auth", 
        "./pnpm-workspace.yaml", 
        "./pnpm-lock.yaml", 
        "./package.json",
        "./packages",
    ],
    target="development"
)

k8s_yaml([
    'infrastructure/k8s/auth/auth.depl.yaml',
    'infrastructure/k8s/auth/auth.service.yaml',
    'infrastructure/k8s/auth/auth.config.yaml',
    'infrastructure/k8s/auth/auth.secret.yaml',
    'infrastructure/k8s/auth/auth.job.yaml', 
    ])

k8s_resource(
    'auth-deployment',
    port_forwards=['4000:4000','9002:9229'],
    resource_deps=['build-packages', 'ghcr-secret'],
    labels=['apps']
)

k8s_resource(
    'auth-job',
    resource_deps=['build-packages', 'ghcr-secret'],
    labels=['jobs']
)

# Postgres
k8s_yaml([  
    'infrastructure/k8s/postgres/postgres.depl.yaml',
    'infrastructure/k8s/postgres/postgres.service.yaml',
    'infrastructure/k8s/postgres/postgres.secret.yaml',
    ])

k8s_resource(
    'postgres',
    port_forwards=['5432:5432'],
    resource_deps=['ghcr-secret'],
    labels=['databases']
)
