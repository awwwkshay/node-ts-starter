APPS = ["api", "web"]

def ignore_other_apps(current):
    ignored = []
    for app in APPS:
        if app != current:
            ignored.append("./apps/" + app)
    return ignored

# api
docker_build(
    ref="gcr.io/awwwkshay/node-ts-api-starter", 
    context=".",
    dockerfile="./apps/api/Dockerfile",
    live_update=[
        sync("./apps/api/src/", "/app/apps/api/src"),
    ],
    ignore=ignore_other_apps("api"),
    target="development"
)

k8s_yaml([
    'infrastructure/k8s/namespace.yaml',    
    'infrastructure/k8s/api/api.depl.yaml',
    'infrastructure/k8s/api/api.service.yaml',
    'infrastructure/k8s/api/api.config.yaml',
    'infrastructure/k8s/api/api.secret.yaml',
    ])

k8s_resource(
   'api-deployment',
    port_forwards=['8000:8000','9000:9229']
)

# web
docker_build(
    ref="gcr.io/awwwkshay/node-ts-web-starter",
    context=".",
    dockerfile="./apps/web/Dockerfile",
    live_update=[
        sync("./apps/web/src/", "/app/apps/web/src"),
        sync("./apps/web/public/", "/app/apps/web/public"),
    ],
    ignore=ignore_other_apps("web"),
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
    port_forwards=['3000:3000','9001:9229']
)

# Postgres

k8s_yaml([  
    'infrastructure/k8s/postgres/postgres.depl.yaml',
    'infrastructure/k8s/postgres/postgres.service.yaml',
    'infrastructure/k8s/postgres/postgres.secret.yaml',
    ])

k8s_resource(
    'postgres',
    port_forwards=['5432:5432']
)
