export default function serviceYml(overrides){
    return Object.assign({
        mem_limit: 1000000000,
        ports: ["80:3000"],
        working_dir: "/app",
        command: ["npm", "run", "deploy"]
    }, overrides)
}
