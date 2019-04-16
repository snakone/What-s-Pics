import { FAQ } from '@app/shared/interfaces/interfaces';

export const QUESTIONS: FAQ[] = [
  {
    question: '¿Qué es What\'s Pics?',
    answer: `What's Pics es una aplicación que te permite compartir <b>fotos</b> de una
    manera rápida y sencilla con todo el mundo. Si lo deseas también puedes
    compartir la <b>ubicación</b> de tu lugar favorito.`,
    collapsed: false,
    arrow: 'ios-arrow-forward'
  },
  {
    question: '¿Qué puedo compartir?',
    answer: `Puedes compartir fotos de cualquier tipo. Nosotros no vamos a decirte que no lo hagas.
    Sin embargo, algunas fotos no están permitidas, por ejemplo, fotos <b>sexuales</b> o <b>racistas</b>,
    de índole <b>religioso</b>, <b>homófobas</b> o cualquier tipo de fotografía <b>ofensiva</b>.`,
    collapsed: true,
    arrow: 'ios-arrow-forward'
  },
  {
    question: '¿Quién ve lo que comparto?',
    answer: `Todo el mundo que tenga instalada la aplicación podrá ver lo que has compartido. Esto
    incluye tu <b>nombre</b>, foto de <b>avatar</b>, el <b>email</b> con el que te registraste y
    las <b>fotos</b> y <b>mensajes</b> que compartas`,
    collapsed: true,
    arrow: 'ios-arrow-forward'
  },
  {
    question: '¿Quién creó What\'s Pics?',
    answer: `Es un placer ayudarte. Soy <b>Sergio Martínez</b>, <b>Frontend Developer</b> con frameworks
    cómo <b>Angular</b>, <b>Ionic</b>, <b>Cordova</b>. Si quieres saber más sobre mi puedes visitar mi
    página de <a href="https://www.linkedin.com/in/sergio-martinez-9b933a13a/" target="_NEW">Linkedln</a>.`,
    collapsed: true,
    arrow: 'ios-arrow-forward'
  },
  {
    question: 'Derechos y Servicios',
    answer: `Esta aplicación es totalmente <b>gratuita</b>, tienes derecho a usarla libremente siempre siguiendo
    las normas de subida de fotos y política de conducta. El código es abierto y puedes encontrarlo en
    <a href="https://github.com/snakone/What-s-Pics" target="_NEW">Github</a>.<br><br>Nuestro servicio te ofrece
    la capacidad de subir fotos a la <b>nube</b> para que puedas acceder a ellas en todo momento.`,
    collapsed: true,
    arrow: 'ios-arrow-forward'
  }
];
