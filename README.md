# Check Work

출퇴근 기록 관리 앱

## 요구사항 명세

### 회원 기능

- 회원 정보 관리 (이름, 나이, 직장, 임금)

### 출퇴근 기록 관리 기능

- 일 별 출퇴근 시간 기록
- 출퇴근 시간 기록 수정 가능
- 선택 기간 출퇴근 기록 정산 (기간, 업무 시간 등)

## 도메인 정리

### 회원 (Users)

```ts
{
  id: number,
  name: string,
  email: string,
  company: string,
  wage: number,
  created: date,
  updated: date
}
```

### 출퇴근 기록 (Records)

```ts
{
  records_users_fk: number,
  day: date,
  start: date,
  end: date
}
```
