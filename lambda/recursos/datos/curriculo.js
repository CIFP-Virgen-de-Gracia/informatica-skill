// Módulo que contiene los estudios. Lo hacemos así para simular un servicio web donde los obtendríamos.

module.exports = {
    ciclos:
        [
            {
                id: "DAM",
                nombre: "Desarrollo de Aplicaciones Multiplataforma. ",
                descripcion: "Crearás aplicaciones multiplataforma, distribuidas, para móviles, juegos y gestión. ",
                tipo: "Ciclo Formativo de Grado Superior. ",
                horas: "2000 horas. ",
                imagen: "dam.png",
                cursos: [
                    {
                        id: '1',
                        descripcion: 'primero',
                        numero: '1.º',
                        modulos: [
                            {
                                id: 'SI',
                                nombre: 'Sistemas informáticos. ',
                                descripcion: 'Aprenderás a configurar sistemas operativos como Windows y Linux y redes de comunicación. ' 
                            },
                            {
                                id: 'BD',
                                nombre: 'Bases de datos. ',
                                descripcion: 'Crearás y consultarás información contenida en bases de datos. ' 
                            },
                            {
                                id: 'PR',
                                nombre: 'Programación. ',
                                descripcion: 'Desarrollarás tus primeros programas basados en objetos. ' 
                            }, 
                            {
                                id: 'LM',
                                nombre: 'Lenguajes de marcas y sistemas de gestión de información. ',
                                descripcion: 'Aprenderás todo sobre XML, HTML, y gestores de información. ' 
                            },
                            {
                                id: 'ED',
                                nombre: 'Entornos de desarrollo. ',
                                descripcion: 'Utilizarás IDEs, y aprenderás a diseñar, probar y documentar programas. ' 
                            }
                        ]
                    }, 
                    {
                        id: '2',
                        descripcion: 'segundo',
                        numero: '2.º',
                        modulos: [
                            {
                                id: 'AD',
                                nombre: 'Acceso a datos. ',
                                descripcion: 'Accederás a la información desde distinta fuentes como XML, bases de datos, ficheros específicos. ' 
                            }, 
                            {
                                id: 'DI',
                                nombre: 'Desarrollo de interfaces. ',
                                descripcion: 'Desarrollaras aplicaciones interactivas de escritorio. ' 
                            },
                            {
                                id: 'PM',
                                nombre: 'Programación multimedia y dispositivos móviles. ',
                                descripcion: 'Realizarás aplicaciones para móviles y videojuegos. ' 
                            },
                            {
                                id: 'PS',
                                nombre: 'Programación de servicios y procesos. ',
                                descripcion: 'Desarrollarás aplicaciones multihilo, cliente servidor y servicios. ' 
                            },
                            {
                                id: 'SG',
                                nombre: 'Sistemas de gestión empresarial. ',
                                descripcion: 'Programarás aplicaciones comerciales y de gestión. ' 
                            }
                        ]
                    }
                ] 
            },
            {
                id: "DAW",
                nombre: "Desarrollo de Aplicaciones Web. ",
                descripcion: "Aprenderás a crear aplicaciones web desde el lado del cliente y el servidor. ",
                tipo: "Ciclo Formativo de Grado Superior. ",
                horas: "2000 horas. ",
                imagen: "daw.png",
                cursos: [
                    {
                        id: '1',
                        descripcion: 'primero',
                        numero: '1.º',
                        modulos: [
                            {
                                id: 'SI',
                                nombre: 'Sistemas informáticos. ',
                                descripcion: 'Aprenderás a configurar sistemas operativos como Windows y Linux y redes de comunicación. ' 
                            },
                            {
                                id: 'BD',
                                nombre: 'Bases de datos. ',
                                descripcion: 'Crearás y consultarás información contenida en bases de datos. ' 
                            },
                            {
                                id: 'PR',
                                nombre: 'Programación. ',
                                descripcion: 'Desarrollarás tus primeros programas basados en objetos. ' 
                            }, 
                            {
                                id: 'LM',
                                nombre: 'Lenguajes de marcas y sistemas de gestión de información. ',
                                descripcion: 'Aprenderás todo sobre XML, HTML, y gestores de información. ' 
                            },
                            {
                                id: 'ED',
                                nombre: 'Entornos de desarrollo. ',
                                descripcion: 'Utilizarás IDEs, y aprenderás a diseñar, probar y documentar programas. ' 
                            }
                        ]
                    }, 
                    {
                        id: '2',
                        descripcion: 'segundo',
                        numero: '2.º',
                        modulos: [
                            {
                                id: 'DC',
                                nombre: 'Desarrollo web en entorno cliente. ',
                                descripcion: 'Desarrollo de web desde la perpectiva front-end. ' 
                            }, 
                            {
                                id: 'DS',
                                nombre: 'Desarrollo web en entorno servidor. ',
                                descripcion: 'Desarrollo de web desde la perpectiva back-end. ' 
                            },
                            {
                                id: 'DP',
                                nombre: 'Despliegue de aplicaciones web. ',
                                descripcion: 'Configurarás los servidores necesarios para poner en marcha tu proyecto web. ' 
                            },
                            {
                                id: 'IW',
                                nombre: 'Diseño de interfaces web. ',
                                descripcion: 'Desarrollarás interfaces web usables y accesibles. ' 
                            }
                        ]
                    }
                ] 
            },
            {
                id: "ASIR",
                nombre: "Administración de Sistemas Informáticos y Redes. ",
                descripcion: "Configurarás equipos, sistemas y arquitectura de red. ",
                tipo: "Ciclo Formativo de Grado Superior. ",
                horas: "2000 horas. ",
                imagen: "asir.png",
                cursos: [
                    {
                        id: '1',
                        descripcion: 'primero',
                        numero: '1.º',
                        modulos: [
                            {
                                id: 'IS',
                                nombre: 'Implantación de sistemas operativos. ',
                                descripcion: 'Implantarás y configurarás sistemas operativos Windows y Linux. ' 
                            },
                            {
                                id: 'PR',
                                nombre: 'Planificación y administración de redes. ',
                                descripcion: 'Configurarás infraestructura de red avanzadas. ' 
                            },
                            {
                                id: 'FH',
                                nombre: 'Fundamentos de hardware. ',
                                descripcion: 'Configurarás el hardware de distintos equipos. ' 
                            },
                            {
                                id: 'GB',
                                nombre: 'Gestión de bases de datos. ',
                                descripcion: 'Gestionarás distintas bases de datos y su información. ' 
                            },
                            {
                                id: 'LM',
                                nombre: 'Lenguajes de marcas y sistemas de gestión de información. ',
                                descripcion: 'Aprenderás todo sobre XML, HTML, y gestores de información. ' 
                            },
                        ]
                    }, 
                    {
                        id: '2',
                        descripcion: 'segundo',
                        numero: '2.º',
                        modulos: [
                            {
                                id: 'AS',
                                nombre: 'Administración de sistemas operativos. ',
                                descripcion: 'Administrarás de manera avanzada distintos sistemas operativos Windows y Linux. ' 
                            },
                            {
                                id: 'SI',
                                nombre: 'Servicios de red e Internet. ',
                                descripcion: 'Configurarás servidores y servicios para red e internet como web, ftp, correo y muchos mas. ' 
                            },
                            {
                                id: 'AW',
                                nombre: 'Implantación de aplicaciones web. ',
                                descripcion: 'Realizarás aplicaciones web usando sistemas de gestión de contenidos y lenguajes específicos. ' 
                            },
                            {
                                id: 'AB',
                                nombre: 'Administración de sistemas gestores de bases de datos. ',
                                descripcion: 'Administrarás de forma avanzada distintos sistemas gestores de base de datos. ' 
                            },
                            {
                                id: 'SA',
                                nombre: 'Seguridad y alta disponibilidad. ',
                                descripcion: 'Implementarás medidas de seguridad y disponibilidad aplicando técnicas de auditoria y seguridad de la información. ' 
                            }
                        ]
                    }
                ] 
            },
            {
                id: "SMR",
                nombre: "Sistemas Microinformáticos y Redes. ",
                descripcion: "Aprenderás a manejar distintos sistemas y configurar redes. ",
                tipo: "Ciclo Formativo de Grado Medio. ",
                horas: "2000 horas. ",
                imagen: "smr.png",
                cursos: [
                    {
                        id: '1',
                        descripcion: 'primero',
                        numero: '1.º',
                        modulos: [
                            {
                                id: 'MM',
                                nombre: 'Montaje y mantenimiento de equipo. ',
                                descripcion: 'Montarás y configurarás tu equipo informático. ' 
                            },
                            {
                                id: 'SM',
                                nombre: 'Sistemas operativos monopuesto. ',
                                descripcion: 'Configurarás a nivel de usuario tu sistema operativo Windows y Linux. ' 
                            },
                            {
                                id: 'RL',
                                nombre: 'Redes locales. ',
                                descripcion: 'Configurarás a nivel local tus redes de transmisión de datos. ' 
                            },
                            {
                                id: 'AW',
                                nombre: 'Aplicaciones Web. ',
                                descripcion: 'Crearás tus aplicaciones basadas en tecnología web. ' 
                            }
                        ]
                    }, 
                    {
                        id: '2',
                        descripcion: 'segundo',
                        numero: '2.º',
                        modulos: [
                            {
                                id: 'AO',
                                nombre: 'Aplicaciones ofimáticas. ',
                                descripcion: 'Manejarás aplicaciones ofimáticas y sus herramientas asociadas. ' 
                            },
                            {
                                id: 'SR',
                                nombre: 'Sistemas operativos en red. ',
                                descripcion: 'Configurarás y explotarás sistemas operativos interconectados como Windows y Linux. ' 
                            },
                            {
                                id: 'SI',
                                nombre: 'Seguridad informática. ',
                                descripcion: 'Configurarás medidas de seguridad básica para tus equipos informáticos y para distintos mecanismos de almacenamiento de la información . ' 
                            },
                            {
                                id: 'SR',
                                nombre: 'Servicios en red. ',
                                descripcion: 'Configuraras tus propios servidiores y servicios como web, ftp, o corre . ' 
                            }
                        ]
                    }
                ] 
            }
        ]
}

