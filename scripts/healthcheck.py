#!/usr/bin/env python3
"""
AccessAudit Multi-Cloud Deployment Health Monitor
Tests connectivity, response latency, and HTTP status codes across the live multi-cloud architecture:
- Frontend (Vercel Edge CDN)
- Backend REST API (Render Cloud)
- OpenAPI Documentation (Swagger UI)
"""

import sys
import time
import urllib.request
import urllib.error

SERVICES = [
    {
        "name": "Frontend Edge SPA",
        "provider": "Vercel Edge CDN",
        "url": "https://accessaudit-cu.vercel.app",
        "expected_status": 200,
    },
    {
        "name": "Backend REST API (Health)",
        "provider": "Render Cloud API",
        "url": "https://s-06-accessibility-audit-inclusion.onrender.com/api/health",
        "expected_status": 200,
    },
    {
        "name": "Swagger UI Documentation",
        "provider": "Render Cloud API",
        "url": "https://s-06-accessibility-audit-inclusion.onrender.com/swagger-ui.html",
        "expected_status": 200,
    }
]

def check_service(service):
    name = service["name"]
    url = service["url"]
    provider = service["provider"]
    expected = service["expected_status"]

    print(f"[*] Checking {name} [{provider}]...")
    start_time = time.time()
    try:
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "AccessAudit-HealthCheck/1.0"}
        )
        with urllib.request.urlopen(req, timeout=45) as response:
            latency = (time.time() - start_time) * 1000
            status = response.getcode()
            if status == expected:
                print(f"    [OK] Status: {status} | Latency: {latency:.1f}ms | URL: {url}")
                return True
            else:
                print(f"    [WARN] Status: {status} (Expected {expected}) | URL: {url}")
                return False
    except urllib.error.HTTPError as e:
        latency = (time.time() - start_time) * 1000
        print(f"    [FAIL] HTTP Error: {e.code} {e.reason} | Latency: {latency:.1f}ms | URL: {url}")
        return False
    except Exception as e:
        print(f"    [FAIL] Network Error: {str(e)} | URL: {url}")
        return False

def main():
    print("=" * 70)
    print(" ACCESSAUDIT MULTI-CLOUD PRODUCTION HEALTH MONITOR")
    print("=" * 70)
    
    passed = 0
    total = len(SERVICES)
    
    for s in SERVICES:
        if check_service(s):
            passed += 1
        print("-" * 70)

    print(f"\nSummary: {passed}/{total} services healthy.")
    if passed == total:
        print("[SUCCESS] All multi-cloud production services operational!")
        sys.exit(0)
    else:
        print("[NOTICE] One or more endpoints encountered delays or errors.")
        sys.exit(1)

if __name__ == "__main__":
    main()
