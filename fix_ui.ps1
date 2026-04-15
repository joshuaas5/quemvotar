$file = 'src/components/Highlights.tsx'
$text = [IO.File]::ReadAllText($file, [Text.Encoding]::UTF8)
$text = $text -replace '(?m)^\s*import \{ getPartyMeta \} from .*/lib/party-meta.*?
', ''
$text = $text -replace '(?m)^\s*const partyMeta = getPartyMeta\(candidato\.partido\);?
', ''
[IO.File]::WriteAllText($file, $text, [Text.Encoding]::UTF8)

$file = 'src/app/parlamentares/page.tsx'
$text = [IO.File]::ReadAllText($file, [Text.Encoding]::UTF8)
$text = $text -replace '(?m)^\s*import \{ getPartyMeta \} from .*/lib/party-meta.*?
', ''
$text = $text -replace '(?m)^\s*const partyMeta = getPartyMeta\(candidato\.partido\);?
', ''
[IO.File]::WriteAllText($file, $text, [Text.Encoding]::UTF8)
