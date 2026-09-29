// Construit l'APK Android et le copie dans public/ pour le bouton « Télécharger l'application ».
// Prérequis : JDK 21 et Android SDK (Android Studio), ANDROID_HOME défini.
import { execSync } from 'node:child_process';
import { copyFileSync, rmSync } from 'node:fs';

const APK_NAME = 'nature-raphia.apk';
const run = (cmd, cwd) => execSync(cmd, { stdio: 'inherit', cwd });

run('npx vite build');
// Ne pas embarquer l'ancien APK dans le nouveau
rmSync(`dist/${APK_NAME}`, { force: true });
run('npx cap sync android');
run(process.platform === 'win32' ? '.\\gradlew.bat assembleDebug' : './gradlew assembleDebug', 'android');

const output = 'android/app/build/outputs/apk/debug/app-debug.apk';
copyFileSync(output, `public/${APK_NAME}`);
copyFileSync(output, `dist/${APK_NAME}`);
console.log(`\nAPK prêt : public/${APK_NAME} (servi sur /${APK_NAME})`);
