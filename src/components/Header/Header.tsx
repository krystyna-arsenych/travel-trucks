'use client'

import css from './Header.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathName = usePathname()

    return (
        <header className={css.header}>
            <div className={css.container}>
                <Link href='/' className={css.title}>Travel<span className={css.span}>Trucks</span></Link>
                <nav className={css.nav}>
                    <ul className={css.list}>
                    <li>
                        <Link href='/' className={`${css.link} ${pathName === "/" ? css.active : ""}`}>Home</Link>
                    </li>
                    <li>
                        <Link href='/catalog' className={`${css.link} ${pathName.startsWith("/catalog") ? css.active : ""}`}>Catalog</Link>
                    </li>
                    </ul></nav>
                <div></div>
            </div>
        </header>
    )
}