import BookItem from '@/components/BookItem';
import { BookData } from '@/types';

export default async function Page(
  props: {
    searchParams: Promise<{
      q?: string;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${searchParams.q}`
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
