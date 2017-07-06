module.exports = function (grunt) {

    

    var uglifyAssetcfg = {};
    uglifyAssetcfg[grunt.option('to')] = grunt.option('from');
    
    var cssMinAssetcfg = {};
    cssMinAssetcfg[grunt.option('to')] = [grunt.option('from')];
    
    grunt.log.write(grunt.option('from'));
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["assets/*"],
        shell: {
            buildAssets: {
                command: "ECHO -------RD /s /q static\\assets & RD /s /q static\\assets & ECHO -------MD static\\assets & MD static\\assets & ECHO -------DEL /q static\\js\\all-*.* & DEL /q static\\js\\all-*.* & ECHO -------DEL /q static\\css\\all-*.* & DEL /q static\\css\\all-*.* & ECHO -------icacls static\\assets /grant IUSR:(OI)(CI)(M) & icacls static\\assets /grant IUSR:(OI)(CI)(M) & ECHO  -------CD protected & CD protected & ECHO  -------C:\\PHP\\php-7.1.x-nts-Win32-VC14-x64\\php-win.exe yii asset humhub/config/assets.php humhub/config/assets-prod.php &  C:\\PHP\\php-7.1.x-nts-Win32-VC14-x64\\php-win.exe yii asset humhub/config/assets.php humhub/config/assets-prod.php"
            },
            buildSearch: {
                command: "ECHO  -------CD protected & CD protected & ECHO  -------C:\\PHP\\php-7.1.x-nts-Win32-VC14-x64\\php-win.exe yii search/rebuild &  C:\\PHP\\php-7.1.x-nts-Win32-VC14-x64\\php-win.exe yii search/rebuild"
            },
            buildTheme: {
                command: function(name) {
                    theme = name || grunt.option('name') || "HumHub";
                    return "cd themes\\"+theme+"\\less & lessc -x build.less ../css/theme.css";
                }
            }
            
        },
        uglify: {
            build: {
                files: {
                    'js/dist/humhub.all.min.js': ['js/dist/humhub.all.js']
                }
            },
            assets: {
                options: {
                    preserveComments: /^!|@preserve|@license|@cc_on/i
                },
                files: uglifyAssetcfg
            }
        },
        cssmin: {
            target: {
                files: cssMinAssetcfg
            }
        },
        less: {
            dev: {
                files: {
                    'themes/HumHub/css/less/theme.css': 'themes/HumHub/css/less/theme.less'
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    
    //grunt.registerTask('default', ['watch']);
    grunt.registerTask('build-assets', ['shell:buildAssets']);
    grunt.registerTask('build-search', ['shell:buildSearch']);
    
    /**
     * Build default HumHub theme:
     * 
     * > grunt build-theme
     * 
     * Build named theme:
     * > grunt build-theme --name=MyTheme
     * 
     * or
     * 
     * > grunt shell:buildTheme:MyTheme
     */
    grunt.registerTask('build-theme', ['shell:buildTheme']);
};