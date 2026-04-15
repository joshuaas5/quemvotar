$file = 'src/app/parlamentares/page.tsx'
$text = [IO.File]::ReadAllText($file, [Text.Encoding]::UTF8)
$text = $text -replace '(?m)^\s*const partyMeta = getPartyMeta\(perfil\.partido\);.*?
', ''
[IO.File]::WriteAllText($file, $text, [Text.Encoding]::UTF8)
