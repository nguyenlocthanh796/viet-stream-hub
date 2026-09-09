#!/usr/bin/env bash
# ==============================================================================
# VietStream Hub - 1-Click Setup Script cho macOS, Linux & Termux
# ==============================================================================
set -euo pipefail

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

clear
echo -e "${CYAN}===================================================================${NC}"
echo -e "${CYAN}     VietStream Hub - Trung Tam Phim 4K Vietsub & The Thao         ${NC}"
echo -e "${CYAN}           He sinh thai giai tri mien phi cho nguoi Viet           ${NC}"
echo -e "${CYAN}===================================================================${NC}"

ADDON_MANIFEST_URL="https://raw.githubusercontent.com/nguyenlocthanh796/viet-stream-hub/main/stremio/manifest.json"
CLOUDSTREAM_REPO_URL="https://raw.githubusercontent.com/nguyenlocthanh796/viet-stream-hub/main/cloudstream/repo.json"

echo -e "\n${GREEN}[1/2] Kich hoat Addon vao Stremio (macOS / Linux / Web)...${NC}"
STREMIO_URI="stremio://raw.githubusercontent.com/nguyenlocthanh796/viet-stream-hub/main/stremio/manifest.json"

if command -v xdg-open &>/dev/null; then
    xdg-open "$STREMIO_URI" >/dev/null 2>&1 || true
    echo -e "    -> ${GREEN}[OK] Da mo ung dung Stremio! Bam 'Install' de xac nhan.${NC}"
elif command -v open &>/dev/null; then
    open "$STREMIO_URI" >/dev/null 2>&1 || true
    echo -e "    -> ${GREEN}[OK] Da mo ung dung Stremio tren macOS! Bam 'Install' de xac nhan.${NC}"
else
    echo -e "    -> Vui long copy link Addon va dan vao o tim kiem Addon tren Stremio:"
    echo -e "       ${CYAN}${ADDON_MANIFEST_URL}${NC}"
fi

echo -e "\n${GREEN}[2/2] HUONG DAN DANG KY CHO DIEN THOAI & SMART TV (CLOUDSTREAM)${NC}"
echo -e "${CYAN}-------------------------------------------------------------------${NC}"
echo -e "1. Mo ung dung Cloudstream tren Dien thoai hoac Tivi."
echo -e "2. Vao Cai dat (Settings) -> Tien ich mo rong (Extensions) -> Them kho (Add Repository)."
echo -e "3. Dat ten: ${YELLOW}VietStream Hub${NC}"
echo -e "4. Dan URL kho luu tru sau:"
echo -e "   ${YELLOW}${CLOUDSTREAM_REPO_URL}${NC}"
echo -e "${CYAN}-------------------------------------------------------------------${NC}"
echo -e "\n${GREEN}[OK] HOAN TAT THIET LAP! CHUC BAN XEM PHIM VUI VE!${NC}"
