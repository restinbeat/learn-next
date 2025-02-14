import { notFound } from 'next/navigation';
import style from './page.module.css';
import { createReviewAction } from '@/actions/create-review.action';

// generateStaticParams 이외의 페이지 이동시 자동으로 not-found
// export const dynamicParams = false;

export function generateStaticParams() {
  // 문자열로 데이터 명시해줘야함
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      <form action={createReviewAction}>
        <input name="bookId" value={bookId} hidden readOnly />
        <input required name="content" placeholder="리뷰 내용" />
        <input required name="author" placeholder="작성자" />
        <button type="submit">작성하기</button>
      </form>
    </section>
  );
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    await response.json();

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const searchParams = await params;
  return (
    <div className={style.container}>
      <BookDetail bookId={searchParams.id} />
      <ReviewEditor bookId={searchParams.id} />
    </div>
  );
}
