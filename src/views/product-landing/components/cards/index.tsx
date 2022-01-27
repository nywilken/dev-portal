import React from 'react'
import InlineSvg from '@hashicorp/react-inline-svg'
import classNames from 'classnames'
import tagIconDict from './tag-icon-dict.json'
import { CardProps } from './types'
import MaybeInternalLink from 'components/maybe-internal-link'
import Text from 'components/text'
import s from './style.module.css'

function Cards({ columns, cards }: CardProps): React.ReactElement {
  return (
    <div className={s.root}>
      <div className={classNames(s.cards, s[`columns-${columns}`])}>
        {cards.map((card, idx) => {
          const { iconSvg, heading, text, tags, url } = card
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              className={classNames(s.cardWrapper, s[`columns-${columns}`])}
            >
              {/* TODO: use href from props, rather than always same link */}
              <MaybeInternalLink className={s.card} href={url}>
                {iconSvg && (
                  <span className={s.cardIcon}>
                    <InlineSvg src={iconSvg} />
                  </span>
                )}
                {/* TODO: should we update this to use body sizes instead of display? */}
                <span className={s.cardHeading}>{heading}</span>
                <Text asElement="span" className={s.cardText} size={200}>
                  {text}
                </Text>
                {tags && (
                  <span className={s.cardTags}>
                    {tags.map((tag) => {
                      return <InlineSvg key={tag} src={tagIconDict[tag]} />
                    })}
                  </span>
                )}
              </MaybeInternalLink>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export type { CardProps }
export default Cards
