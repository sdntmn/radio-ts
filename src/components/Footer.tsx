import React from "react"

export const Footer: React.FC = () => {
  return (
    <footer className="footer page__section">
      <p>Российские и зарубежные радиостанции в режиме онлайн.</p>
      <p translate="no">
        Все права на аудио материалы, представленные на сайте принадлежат их
        законным владельцам.
      </p>
      <p className="footer__copyright">© {new Date().getFullYear()} SDN</p>
    </footer>
  )
}
