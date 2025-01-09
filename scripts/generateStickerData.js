//스티커 데이터 json 형태로 생성 코드

import {
  readFileSync,
  writeFileSync,
  readdirSync,
  mkdirSync,
  existsSync,
} from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// public/stickers 폴더 경로 설정
const stickersDir = join(__dirname, '../public/stickers');
const dataDir = join(__dirname, '../src/data');

// 색상 순서 정의
const colorOrder = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

function generateStickerData() {
  // data 폴더가 없으면 생성
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  // stickers 폴더 안의 모든 파일 읽기
  const files = readdirSync(stickersDir);

  // 파일명에서 색상을 추출하고 정렬하는 함수
  const getColorFromFilename = (filename) => {
    for (const color of colorOrder) {
      if (filename.toLowerCase().includes(color)) {
        return color;
      }
    }
    return 'other'; // 색상이 없는 경우
  };

  // 색상 순서대로 정렬
  const stickers = files
    .filter((file) => file.match(/\.(png|jpg|jpeg|gif)$/i))
    .sort((a, b) => {
      const colorA = getColorFromFilename(a);
      const colorB = getColorFromFilename(b);
      return colorOrder.indexOf(colorA) - colorOrder.indexOf(colorB);
    })
    .map((file, index) => ({
      id: `sticker-${index}`,
      src: `/stickers/${file}`,
      alt: `스티커 ${index + 1}`,
      color: getColorFromFilename(file),
    }));

  // JSON 파일로 저장
  writeFileSync(
    join(dataDir, 'stickers.json'),
    JSON.stringify({ stickers }, null, 2),
  );

  console.log('스티커 데이터가 성공적으로 생성되었습니다!');
}

generateStickerData();
