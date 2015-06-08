module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        watch: {
            prepbrowser: {
                files: ['LocateMe/www/**'],
                tasks: ['cordovacli:prepare_browser']
            }
        },
        cordovacli: {
            options: {
                path: 'LocateMe',
                cli: 'cordova' // cca or cordova
            },
            cordova: {
                options: {
                    command: ['create', 'platform', 'plugin', 'build'],
                    platforms: ['browser'],
                    plugins: [],
                    path: 'LocateMe',
                    id: 'com.locate.me',
                    name: 'LocateMe'
                }
            },
            create: {
                options: {
                    command: 'create',
                    id: 'com.locate.me',
                    name: 'LocateMe'
                }
            },
            add_platforms: {
                options: {
                    command: 'platform',
                    action: 'add',
                    platforms: ['browser']
                }
            },
            add_plugins: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [
                        'cordova-plugin-console',
                        'cordova-plugin-device',
                        'cordova-plugin-dialogs',
                        'cordova-plugin-splashscreen',
                        'cordova-plugin-whitelist',
                        'cordova-plugin-geolocation'
                    ]
                }
            },
            remove_plugin: {
                options: {
                    command: 'plugin',
                    action: 'rm',
                    plugins: [
                        'cordova-plugin-console',
                        'cordova-plugin-device',
                        'cordova-plugin-dialogs',
                        'cordova-plugin-splashscreen',
                        'cordova-plugin-whitelist',
                        'cordova-plugin-geolocation'
                    ]
                }
            },
            build_ios: {
                options: {
                    command: 'build',
                    platforms: ['ios']
                }
            },
            build_android: {
                options: {
                    command: 'build',
                    platforms: ['android']
                }
            },
            emulate_android: {
                options: {
                    command: 'emulate',
                    platforms: ['android'],
                    args: ['--target', 'Nexus5']
                }
            },
            run_wp8: {
                options: {
                    command: 'run',
                    platforms: ['wp8'],
                    args: ['--device']
                }
            },
            run_browser: {
                options: {
                    command: 'run',
                    platforms: ['browser']
                }
            },
            build_browser: {
                options: {
                    command: 'build',
                    platforms: ['browser']
                }
            },
            prepare_browser: {
                options: {
                    command: 'prepare',
                    platforms: ['browser']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-cordovacli');
    grunt.registerTask("prepare", ["cordovacli:add_plugins", "cordovacli:add_platforms"]);
};