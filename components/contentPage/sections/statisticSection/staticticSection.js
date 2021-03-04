import styles from './statisticSection.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faAngular, faNodeJs } from '@fortawesome/free-brands-svg-icons';

export default function statisticSection() {
  return (
    <div className={"section" + ' ' + styles.container}>
      <div className="sectionTitle">
        <h2 className="sectionTitle_content">Statistic</h2>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.stat}>
          <div
            id="stat_programming" 
            className={styles.stat_number}
          >
            2.5
          </div>
          <div className={styles.stat_unit}>
            years
          </div>
          <div className={styles.stat_description}>
            of programming
          </div>
        </div>
        <div className={styles.stat}>
          <div
            id="stat_experience" 
            className={styles.stat_number}
          >
            1
          </div>
          <div className={styles.stat_unit}>
            year
          </div>
          <div className={styles.stat_description}>
            commercional experience
          </div>
        </div>
        <div className={styles.stat}>
          <div
            id="stat_typing" 
            className={styles.stat_number}
          >
            80
          </div>
          <div className={styles.stat_unit}>
            wpm
          </div>
          <div className={styles.stat_description}>
            average typing speed
          </div>
        </div>
      </div>

    </div>
  )
}