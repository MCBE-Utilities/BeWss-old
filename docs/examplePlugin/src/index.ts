import {
  pluginApi, 
} from './@interface/bewss.i'

class examplePlugin {
    private api: pluginApi

    constructor(api: pluginApi) {
      this.api = api
      this.api.setColor('green')
    }

    async onEnabled(): Promise<void> {
      this.api.getLogger().info('Plugin enabled!')
    }

    async onDisabled(): Promise<void> {
      this.api.getLogger().success('Plugin disabled!')
    }
}

export = examplePlugin
