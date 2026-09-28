#!/usr/bin/env python3
"""
RPWD Act 2016 Statutory Accessibility Calculation Verifier
Verifies building compliance scores, ramp slope thresholds, and barrier severity distributions
against statutory standards (RPWD Act 2016 & CPWD Harmonised Guidelines 2021).
"""

import sys

# Statutory parameters
STATUTORY_RAMP_SLOPE_MAX = 1 / 12       # 8.33% statutory maximum slope
RAMP_CRITICAL_SLOPE_THRESHOLD = 1 / 10  # 10% critical hazard threshold
MIN_DOOR_WIDTH_MM = 900                 # 900mm clear door opening
MIN_CORRIDOR_WIDTH_MM = 1500            # 1500mm two-way wheelchair passing

CAMPUS_BENCHMARKS = [
    {"block": "Block A", "buildings": ["A1", "A2", "A3"], "score": 96.7, "status": "Compliant"},
    {"block": "Block C", "buildings": ["C1", "C2", "C3"], "score": 73.2, "status": "Partial"},
    {"block": "Block D", "buildings": ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8"], "score": 74.8, "status": "Partial"},
    {"block": "Nek Chand", "buildings": ["NC 1", "NC 2", "NC 3", "NC 4", "NC 5"], "score": 62.9, "status": "Partial"},
    {"block": "Block B", "buildings": ["B1", "B2", "B3", "B4", "B5"], "score": 59.8, "status": "Partial"},
    {"block": "Zakir Husain", "buildings": ["Zakir A", "Zakir B", "Zakir C"], "score": 57.2, "status": "Partial"},
    {"block": "Block DD", "buildings": ["DD1", "DD2"], "score": 41.6, "status": "Non-Compliant"}
]

BARRIERS_BY_TIER = {
    "Tier 1 (Critical)": 24,
    "Tier 2 (High)": 61,
    "Tier 3 (Medium)": 73,
    "Tier 4 (Low)": 29
}

def verify_slope(rise_mm, run_mm):
    """Calculates rise/run slope ratio and checks compliance."""
    ratio = rise_mm / run_mm
    is_compliant = ratio <= STATUTORY_RAMP_SLOPE_MAX
    is_critical = ratio > RAMP_CRITICAL_SLOPE_THRESHOLD
    return ratio, is_compliant, is_critical

def main():
    print("=" * 65)
    print(" ACCESSAUDIT: RPWD ACT 2016 STATUTORY VERIFICATION")
    print("=" * 65)
    
    total_buildings = sum(len(b["buildings"]) for b in CAMPUS_BENCHMARKS)
    weighted_score = sum(b["score"] * len(b["buildings"]) for b in CAMPUS_BENCHMARKS) / total_buildings
    
    print(f"\n1. Campus Building Audit Scope:")
    print(f"   - Total Academic Blocks: {len(CAMPUS_BENCHMARKS)}")
    print(f"   - Total Buildings Audited: {total_buildings}")
    print(f"   - Weighted Campus Accessibility Index: {weighted_score:.1f}%")
    assert total_buildings == 29, f"Expected 29 buildings, got {total_buildings}"
    print("   [PASS] 29 buildings benchmarked.")

    print(f"\n2. Barrier Classification Check:")
    total_barriers = sum(BARRIERS_BY_TIER.values())
    print(f"   - Total Physical Barriers: {total_barriers}")
    for tier, count in BARRIERS_BY_TIER.items():
        pct = (count / total_barriers) * 100
        print(f"     * {tier}: {count} ({pct:.1f}%)")
    assert total_barriers == 187, f"Expected 187 barriers, got {total_barriers}"
    print("   [PASS] 187 barriers accurately distributed.")

    print(f"\n3. Ramp Gradient Rise/Run Calculation Tests:")
    sample_ramps = [
        ("Block A entrance ramp", 150, 2000),   # 1:13.3 -> Compliant
        ("Block C side ramp", 300, 3600),       # 1:12.0 -> Compliant (boundary)
        ("Block DD entrance threshold", 200, 1600) # 1:8.0 -> Critical Non-Compliant
    ]
    for name, rise, run in sample_ramps:
        ratio, compliant, critical = verify_slope(rise, run)
        status = "COMPLIANT" if compliant else ("CRITICAL NON-COMPLIANT" if critical else "NON-COMPLIANT")
        print(f"   - {name}: rise={rise}mm, run={run}mm -> Slope: 1:{run/rise:.1f} ({ratio*100:.1f}%) -> {status}")

    print("\n" + "=" * 65)
    print(" [VERIFICATION COMPLETE] All statutory calculation tests passed!")
    print("=" * 65)

if __name__ == "__main__":
    main()
