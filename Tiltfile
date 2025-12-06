# api
docker_build(
    ref="node-ts-api-starter", 
    context=".",
    dockerfile="./apps/api/Dockerfile",
    live_update=[
        sync("./apps/api/src/", "/app/apps/api/src"),
    ],
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
    port_forwards='8000:8000'
)

