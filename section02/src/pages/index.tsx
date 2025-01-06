import { ReactNode } from 'react';
import SearchLayout from './components/SearchLayout';
import style from './index.module.css';
import books from '@/mock/books.json';
import BookItem from './components/BookItem';

export default function Home() {
	return (
		<div className={style.container}>
			<section>
				<h3>지금 추천하는 도서</h3>
				{books.map(book => (
					<BookItem key={book.id} {...book} />
				))}
			</section>
			<section>
				<h3>등록된 모든 도서</h3>
				{books.map(book => (
					<BookItem key={book.id} {...book} />
				))}
			</section>
		</div>
	);
}

Home.getLayout = (page: ReactNode) => {
	return <SearchLayout>{page}</SearchLayout>;
};
