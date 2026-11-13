#!/bin/sh
# Recomputes the imports of a wrapped module after hand edits: tools/rewrap.sh src/gerson/attacks/x.js
f="$1"
hdr=$(sed -n '1s#^// ##p' "$f")
tmp="$f.body.tmp"
awk 'BEGIN{body=0} /^\/\/ calls left|^\/\/ obj_|^class |^const |^function / {body=1} body{print}' "$f" > "$tmp"
python -I "$(dirname "$0")/wrap_module.py" "$tmp" "$f" "$hdr"
rm -f "$tmp"
node --check "$f" && echo "$f ok"
