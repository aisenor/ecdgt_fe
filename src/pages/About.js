import React from 'react';
import styles from './About.module.css';
import discGolfImage from './images/stock.jpg'

const About = () => {

  return (
    <div className={styles.page}>
      <h1>About the East Coast Disc Golf Tour</h1>
      <div className={styles.container}>
        <img src={discGolfImage} alt="Disc Golf"/>
      </div>
        <p>
            Flickline Disc Golf and the Nova Scotia Disc Golf Tour are joining forces to bring a bigger and better
            tournament series to the East Coast of Canada. The East Coast Disc Golf Tour (ECDGT) is a new pro / am tour that
            will be Canada's biggest event series. The ECDGT is a registered not-for-profit organization with the goal of
            running the most player-friendly disc golf tour in North America.
        </p>
        <p>
            Through a partnership with Disc Golf Newfoundland (DGNL), Disc Golf Prince Edward Island (DGPEI),
            Flickline Disc Golf, Nova Scotia Disc Golf Tour (NSDGT), and the clubs that represent the majority of the
            courses in Atlantic Canada, we aim to put forward the best of what our region can offer.
        </p>
        <p>
            This tour will combine your favorite features from existing events and provide a new level of consistency
            and quality.
            The ECDGT will standardize registration fees, payout structure, player experience all while allowing our
            Tournament Directors (TDs)
            the flexibility to host amazing events at their local courses. Each tour stop will feature:
            <ul>
                <li>Well marked Out of Bounds areas (OB)</li>
                <li>Detailed caddy books</li>
                <li>Player packs that are flexible and fun</li>
                <li>Added cash on the pro side</li>
                <li>Closest to the Pin (CTP) competitions</li>
                <li>Win your card, win a prize</li>
            </ul>
            There will also be individual event awards as well as season long points that will count towards tour prizes for players who qualify.
        </p>
        <p>
            Another great thing the ECDGT is doing is offering compensation to the local organizing committee, including the TDs, for their work
            preparing the courses and putting on these events, thus making our tour the most economically sustainable in the country.
        </p>
        <p>
            Collectively, our partners run over 100 Professional Disc Golf Association (PDGA) events, including:
            <ul>
                <li>10 B Tiers</li>
                <li>5 National Championships</li>
                <li>Countless leagues and club events</li>
                <li>Canada's first ever Disc Golf Pro Tour (DGPT) event</li>
            </ul>
            This group of individuals have all contributed to making the East Coast of Canada an international success story in the disc golf community.
            We are thrilled to be able to offer something even better by working together towards a shared goal.
        </p>

        <p>Check our calendar in the Tour Dates tab to stay up to date on events and plan your weekends accordingly.</p>
        <p>
            For the tour standings, players scores will be calculated best on their best five (5) two-day events and
            single best one-day event. The Tour Championship will count for its own points. Tour points will count towards
            the end-of-year prizes for each division.
        </p>

        <p>
            If your clubs would like to get involved and possibly host a one-day event, Contact Us!
        </p>
    </div>
  );
};

export default About;