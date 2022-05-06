import styles from "../styles/Home.module.css"

export default function Home() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Sentinel</h1>
            <h2 className={styles.smallText}>The way to keep your server safe.</h2>
            <p className={styles.description}>Sentinel, a Discord Bot created to make sure your server is safe.</p>
            <div className={styles.content}>
                <div className={styles.paragraph}>
                    <p>
                        Sentinel is a Discord bot that will keep your server safe.
                    </p>
                    <p>
                        Sentinel is packed with loads of features to help you destroy any threats you may have.
                    </p>
                    <p>
                        Sentinel has logging, from editing a message to changing the name of the server, has moderation commands to help you punish those who have done wrong, from giving them a warning to denying them access to your server, forever (which you can remove), and fun commands because only security is boring, and an economy system to make you feel rich.
                    </p>
                </div>
            </div>
        </div>
    )
}