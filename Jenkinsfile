@Library('jenny') _

jennyPipeline{
    nodeConfigs = [
        [
            nodeName: 'Linux',
            primaryNode: true,
        ],
        [
            nodeName: 'Apple',
            label: 'apple-vm',
        ],
        [
            nodeName: 'Windows',
        ],
    ]
    projectConfig = [
        projectName: 'alloy',
        npmUploadRepo: 'npm-local-ksf',
        shouldPublish: true,
    ]
    packageConfigs = [
        [
            npm: true,
            dir: '.',
            customTestSh: 'echo "No tests"',
        ]
    ]
}
