
import css from './Hero.module.css'
import Link from 'next/link'

export default function Hero() {
    return (
        <div className={css.container}>
            <div className={css.contentContainer}>
            <h1 className={css.title}>Campers of your dreams</h1>
            <p className={css.text}>You can find everything you want in our catalog</p>
            </div>
            <Link  href='/catalog' className={css.btn}>View Now</Link>
        </div>
    )
}