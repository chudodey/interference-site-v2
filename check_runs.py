import urllib.request, json
url = 'https://api.github.com/repos/chudodey/interference-site-v2/actions/runs?per_page=3'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    d = json.loads(resp.read().decode())
    for r in d.get('workflow_runs', []):
        msg = r['head_commit']['message'][:50]
        print(f"{r['run_number']}: {r['name']} | {msg} | {r['status']} / {r['conclusion']}")
