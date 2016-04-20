export default function serviceYml(settings){
    let dockerComposit = composer.generate(
        presets.resolve(settings)
    )
    let composeFile = cache(dockerComposit)
    let resources = provisionECS(composeFile)
    beautifyResources({settings, resources})
}
