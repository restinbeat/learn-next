import BookItem from '@/components/BookItem';
import { BookData } from '@/types';

// 특정 페이지에 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto : default option, 아무것도 강제하지 않음
// 2. force-dynamic : 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static :  페이지를 강제로 Static 페이지로 설정
// 4. error : 페이지를 강제로 Static 페이지로 설정 (설정하면 안되는 이유 -> 빌드 오류)
// export const dynamic = 'auto';

export default async function Page(props: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${searchParams.q}`,
    { cache: 'force-cache' }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
