import { LocalizationKeyTreeType } from "../keys";

export const de_DE: LocalizationKeyTreeType = {
    application: {
        title: "Your-Project-Name",
        header: {
            userinfo: {
                labels: {
                    loggedInAs: "Angemeldet als",
                    logoutButton: "Ausloggen"
                }
            }
        },
        playground: {
            title: "Das ist ein statischer View Provider und unsere Spielwiese!",
            buttonText: "Erstelle ein Dummy Dokument",
            notification: {
                title: {
                    success: "ERFOLG",
                    error: "FEHLER"
                },
                message: {
                    success: "Neues Dummy Dokument wurde erstellt!",
                    error: "Das Erstellen des Dummy Dokumentes ist fehlgeschlagen!"
                }
            }
        }
    },
    keycloak: {
        processing: {
            message:
                "Sie werden gerade weitergeleitet oder authentifiziert. Bitte haben Sie kurz Geduld, dies kann einen Moment dauern."
        },
        error: {
            message: "Keycloak ist aktuell nicht erreichbar, bitte versuchen Sie es später erneut."
        }
    },
    error: {
        security: {
            notAuthorized: {
                description: "Sie haben keine Berechtigung diese Operation durchzuführen."
            }
        },
        attachment: {
            invalidType: "Ungültiger MIME-Typ."
        },
        "content-store": {
            content: {
                invalidSize: "Der Attachment-Inhalt überschreitet die zulässige Maximalgröße."
            }
        }
    }
};
