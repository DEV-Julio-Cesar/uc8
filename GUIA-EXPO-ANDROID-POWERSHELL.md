# Guia de configuração e limpeza — Expo Android no Windows

Este guia reúne os comandos PowerShell usados para configurar o Android SDK, verificar um celular conectado por USB e corrigir falhas do Gradle causadas por falta de espaço ou cache corrompido.

> Execute o PowerShell como usuário normal. Troque o caminho do projeto pelo caminho usado no computador do aluno.

## 1. Definir e acessar a pasta do projeto

```powershell
$ProjectPath = "C:\Users\SEU_USUARIO\Desktop\UC8\uc8"
Set-Location $ProjectPath
```

Confirme que existe uma pasta `android`:

```powershell
Test-Path ".\android"
```

O resultado esperado é `True`.

## 2. Verificar o Android SDK

O local padrão do SDK instalado pelo Android Studio é:

```powershell
$SdkPath = "$env:LOCALAPPDATA\Android\Sdk"
Test-Path $SdkPath
```

O resultado esperado é `True`. Se aparecer `False`, confira o caminho em **Android Studio → Settings → Languages & Frameworks → Android SDK**.

Verifique também se o ADB está instalado:

```powershell
Test-Path "$SdkPath\platform-tools\adb.exe"
```

## 3. Configurar o SDK no projeto

Crie ou atualize `android\local.properties` com o caminho do SDK:

```powershell
$EscapedSdkPath = $SdkPath.Replace('\', '\\').Replace(':', '\:')
Set-Content -Path ".\android\local.properties" -Value "sdk.dir=$EscapedSdkPath"
Get-Content ".\android\local.properties"
```

Configure também a variável `ANDROID_HOME` para o usuário do Windows:

```powershell
[Environment]::SetEnvironmentVariable("ANDROID_HOME", $SdkPath, "User")
```

Adicione o ADB ao `PATH` do usuário somente se o comando `adb` ainda não for reconhecido:

```powershell
$AdbPath = "$SdkPath\platform-tools"
$UserPath = [Environment]::GetEnvironmentVariable("Path", "User")

if (($UserPath -split ';') -notcontains $AdbPath) {
    [Environment]::SetEnvironmentVariable("Path", "$UserPath;$AdbPath", "User")
}
```

Depois de alterar as variáveis, feche e abra novamente o PowerShell.

## 4. Verificar o celular conectado por USB

Com a **Depuração USB** ativada e o celular desbloqueado, execute:

```powershell
adb devices
```

Resultados possíveis:

- `device`: aparelho conectado e autorizado;
- `unauthorized`: desbloqueie o celular e aceite a autorização de depuração;
- lista vazia: confira o cabo, a porta USB, o modo **Transferência de arquivos** e o driver do fabricante.

Se necessário, reinicie o ADB:

```powershell
adb kill-server
adb start-server
adb devices
```

## 5. Conferir o espaço livre no disco C:

```powershell
Get-PSDrive C
```

Observe a coluna `Free`. Para compilar o projeto com segurança, é recomendável deixar pelo menos **10 GB livres**.

## 6. Corrigir cache corrompido após falta de espaço

Use esta seção quando aparecerem mensagens como:

```text
No space left on device
Espaço insuficiente no disco
CorruptedCacheException
fileHashes.bin
```

Primeiro, feche o Android Studio e outros terminais que estejam compilando o projeto. Depois, dentro da pasta do projeto, pare o Gradle:

```powershell
Set-Location $ProjectPath
.\android\gradlew.bat --stop
```

Remova o cache corrompido do Gradle 9.3.1 e os resultados locais da compilação:

```powershell
Remove-Item -Recurse -Force "$env:USERPROFILE\.gradle\caches\9.3.1" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force ".\android\app\build" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force ".\android\build" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force ".\android\app\.cxx" -ErrorAction SilentlyContinue
```

Essas pastas guardam caches e arquivos gerados pela compilação. Elas serão recriadas automaticamente. Os comandos não removem o código-fonte do aplicativo.

> Antes de executar, confirme que `$ProjectPath` aponta para o projeto correto. Não altere esses comandos para apagar pastas amplas, como o perfil inteiro do usuário ou o disco `C:`.

Se quiser apenas limpar o cache do servidor Expo, execute:

```powershell
npx expo start --clear
```

Depois que o servidor iniciar, pressione `Ctrl+C` para encerrá-lo antes da próxima etapa.

## 7. Compilar e instalar o aplicativo

Confirme novamente o espaço disponível e a conexão do celular:

```powershell
Get-PSDrive C
adb devices
```

Compile e instale o aplicativo:

```powershell
Set-Location $ProjectPath
npx expo run:android
```

Na primeira execução, o Gradle pode baixar vários arquivos e levar alguns minutos. Não interrompa o processo e mantenha espaço livre no disco.

## Diagnóstico detalhado

Se a compilação falhar e o resumo não mostrar a causa, execute:

```powershell
.\android\gradlew.bat app:assembleDebug --stacktrace
```

Procure no resultado as seções `What went wrong` e o primeiro `Caused by`. As últimas linhas com `exited with non-zero code: 1` são apenas o resumo, não a causa original.
