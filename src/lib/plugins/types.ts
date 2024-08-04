import { createStorage } from "@lib/api/storage";
import { Logger } from "@lib/utils/logger";
import { Author } from "@lib/utils/types";

export interface PluginRepo {
    [id: string]: {
        version: string;

        // For plugin developing convenience, plugins with this on will always get fetched
        alwaysFetch?: boolean;
    };
}

export interface PluginRepoStorage {
    [repoUrl: string]: PluginRepo;
}

export interface PluginSettingsStorage {
    [pluginId: string]: {
        enabled: boolean;
    };
}

export interface BunnyPluginManifest {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly version: string;
    readonly authors: Author[];
}

export interface BunnyPluginManifestInternal extends BunnyPluginManifest {
    readonly parentRepository: string;
    readonly jsPath?: string;
}

export interface PluginInstance {
    start?(): void;
    stop?(): void;
    SettingsComponent?(): React.Component<any>;
}

export interface PluginInstanceInternal extends PluginInstance {
    readonly manifest: BunnyPluginManifest;
}

export interface BunnyPluginProperty {
    readonly manifest: BunnyPluginManifestInternal;
    readonly logger: Logger;
    readonly initial: boolean;
    createStorage<T>(): ReturnType<typeof createStorage<T>>;
}

export type BunnyPluginObject = typeof window.bunny & {
    plugin: BunnyPluginProperty;
};