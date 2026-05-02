import urllib.request, urllib.error
url = 'https://api.github.com/repos/chudodey/interference-site-v2/actions/jobs/74038691325/logs'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        print(resp.read().decode()[:3000])
except urllib.error.HTTPError as e:
    print(f"HTTP {e.code}: {e.reason}")
    print(e.read().decode()[:500])
