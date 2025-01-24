/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/v1/auth/authorize": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Authorize */
        post: operations["authorize"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/infraestructura/gerencias": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** GET líneas de tren */
        get: operations["getLineas"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/infraestructura/ramales": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** GET ramales */
        get: {
            parameters: {
                query?: {
                    idGerencia?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A successful response containing an array of ramales */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @example 17 */
                            id: number;
                            /** @example 93 */
                            id_estacion_inicial: number;
                            /** @example 13 */
                            id_estacion_final: number;
                            /** @example 11 */
                            id_gerencia: number;
                            /** @example Constitución-Alejandro Korn */
                            nombre: string;
                            /** @example 15 */
                            estaciones: number;
                            /** @example 1 */
                            operativo: number;
                            /** @example 1 */
                            es_electrico: number;
                            /** @example 1 */
                            tipo_id: number;
                            /** @example 359 */
                            puntualidad_tolerancia: number;
                            /** @example AK */
                            siglas: string;
                            /** @example true */
                            publico: boolean;
                            /** @example 1 */
                            orden_ramal: number;
                            /** @example true */
                            mostrar_en_panel_cumplimiento: boolean;
                            cabecera_inicial: {
                                /** @example 93 */
                                id?: number;
                                /** @example Constitución */
                                nombre?: string;
                                /** @example PC */
                                siglas?: string;
                                /** @example Plaza C. */
                                nombre_corto?: string;
                                /** @example {"totem": "1", "app_mobile": "1"} */
                                visibilidad?: string;
                            };
                            cabecera_final: {
                                /** @example 13 */
                                id?: number;
                                /** @example Alejandro Korn */
                                nombre?: string;
                                /** @example AK */
                                siglas?: string;
                                /** @example A. Korn */
                                nombre_corto?: string;
                                /** @example {"totem": "1", "app_mobile": "1"} */
                                visibilidad?: string;
                            };
                            alerta: {
                                /** @example 68281 */
                                id?: number;
                                /** @example 11 */
                                linea_id?: number;
                                /** @example 15 */
                                ramal_id?: number;
                                estacion_id?: number | null;
                                /** @example 1 */
                                sentido?: string;
                                /** @example OTHER_CAUSE */
                                causa_gtfs?: string;
                                /** @example OTHER_EFFECT */
                                efecto_gtfs?: string;
                                /** @example fa-warning */
                                icono_fontawesome?: string;
                                /** @example De lunes a viernes el último tren de Plaza Constitución a Bosques – T sale a las 21:34 h por obras.  */
                                contenido?: string;
                                /** @example 1 */
                                habilitado?: number;
                                /**
                                 * Format: date-time
                                 * @example 2025-01-07T14:26:00
                                 */
                                vigencia_desde?: string;
                                /** Format: date-time */
                                vigencia_hasta?: string | null;
                                /** @example 4 */
                                criticidad_orden?: number;
                                /** @example #dff0d8 */
                                criticidad_color_fondo?: string;
                                /** @example #3c763d */
                                criticidad_color_texto?: string;
                            }[];
                        }[];
                    };
                };
                /** @description Unauthorized access */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @example 401 */
                            status: number;
                            /** @example Unauthorized */
                            message: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/infraestructura/estaciones": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** GET estaciones */
        get: {
            parameters: {
                query?: {
                    idGerencia?: number;
                    nombre?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A successful response containing an array of estaciones */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @example Bernal */
                            nombre: string;
                            /** @example 39 */
                            id_estacion: string;
                            /** @example 21 */
                            id_tramo: string;
                            /** @example 5 */
                            orden: string;
                            /** @example 11177 */
                            id_referencia: string;
                            /**
                             * Format: float
                             * @example -34.7093395
                             */
                            latitud: string;
                            /**
                             * Format: float
                             * @example -58.2803725
                             */
                            longitud: string;
                            /** @example 727 */
                            referencia_orden: string;
                            /** @example  */
                            radio?: string;
                            /** @example 2 */
                            andenes_habilitados: string;
                            visibilidad: {
                                /** @example 1 */
                                totem?: number;
                                /** @example 1 */
                                app_mobile?: number;
                            };
                            /** @example [
                             *       13,
                             *       11
                             *     ] */
                            incluida_en_ramales: number[];
                            /** @example [
                             *       13,
                             *       11
                             *     ] */
                            operativa_en_ramales: number[];
                        }[];
                    };
                };
                /** @description Unauthorized access */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @example 401 */
                            status: number;
                            /** @example Unauthorized */
                            message: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/arribos/estacion/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** GET estacion by id */
        get: {
            parameters: {
                query?: {
                    hasta?: number;
                    fecha?: string;
                    /** @description Hora en formato 24h HH:MM. */
                    hora?: string;
                    tipoBusqueda?: "partida" | "arribo";
                };
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @description Timestamp of the response */
                            timestamp?: number;
                            results?: {
                                arribo?: {
                                    anden?: {
                                        id?: number;
                                        nombre?: string;
                                    };
                                    orden?: number;
                                    equipo?: {
                                        id?: number;
                                        gpss?: string[];
                                        nombre?: string;
                                        esElectrico?: number;
                                    };
                                    nombre?: string;
                                    parada?: boolean;
                                    salida?: {
                                        /** Format: date-time */
                                        programada?: string;
                                        /** Format: date-time */
                                        estimada?: string;
                                    };
                                    idPunto?: number;
                                    llegada?: {
                                        /** Format: date-time */
                                        programada?: string;
                                        /** Format: date-time */
                                        estimada?: string;
                                    };
                                    idElemento?: number;
                                    programada?: boolean;
                                    segundos?: number;
                                };
                                servicio?: {
                                    numero?: number;
                                    ramal?: {
                                        id?: number;
                                        nombre?: string;
                                        tolerancia?: number;
                                        cabeceraFinal?: {
                                            id?: number;
                                            nombre?: string;
                                            nombreCorto?: string;
                                        };
                                        cabeceraInicial?: {
                                            id?: number;
                                            nombre?: string;
                                            nombreCorto?: string;
                                        };
                                    };
                                    gerencia?: {
                                        id?: number;
                                        nombre?: string;
                                    };
                                    cancelacion?: string;
                                    equipo?: {
                                        id?: number;
                                        gpss?: string[];
                                        nombre?: string;
                                        esElectrico?: number;
                                    };
                                    oculto?: boolean;
                                    sentido?: number;
                                    tipo?: {
                                        id?: number;
                                        nombre?: string;
                                        programado?: boolean;
                                        clasificacion?: {
                                            id?: number;
                                            nombre?: string;
                                        };
                                        subclasificacion?: number;
                                    };
                                    leyenda?: string;
                                    location?: {
                                        /** Format: float */
                                        lat?: number;
                                        /** Format: float */
                                        long?: number;
                                    };
                                    id?: string;
                                    desde?: {
                                        estacion?: {
                                            tipo?: {
                                                id?: number;
                                                nombre?: string;
                                            };
                                            anden?: {
                                                id?: number;
                                                nombre?: string;
                                            };
                                            orden?: number;
                                            tramo?: {
                                                id?: number;
                                                orden?: number;
                                            };
                                            equipo?: {
                                                id?: number;
                                                nombre?: string;
                                            };
                                            nombre?: string;
                                            parada?: boolean;
                                            salida?: {
                                                /** Format: date-time */
                                                programada?: string;
                                                /** Format: date-time */
                                                ultimaHoraRegistrada?: string;
                                                /** Format: float */
                                                distancia?: number;
                                                /** Format: float */
                                                velocidad?: number;
                                                /** Format: float */
                                                latitud?: number;
                                                /** Format: float */
                                                longitud?: number;
                                                referencia?: number;
                                                /** Format: date-time */
                                                real?: string;
                                            };
                                            idPunto?: number;
                                            llegada?: Record<string, never>;
                                            idElemento?: number;
                                            programada?: boolean;
                                        };
                                        punto?: {
                                            tipo?: {
                                                id?: number;
                                                nombre?: string;
                                            };
                                            anden?: {
                                                id?: number;
                                                nombre?: string;
                                            };
                                            orden?: number;
                                            tramo?: {
                                                id?: number;
                                                orden?: number;
                                            };
                                            equipo?: {
                                                id?: number;
                                                nombre?: string;
                                            };
                                            nombre?: string;
                                            parada?: boolean;
                                            salida?: {
                                                /** Format: date-time */
                                                programada?: string;
                                                /** Format: date-time */
                                                estimada?: string;
                                            };
                                            idPunto?: number;
                                            llegada?: {
                                                /** Format: date-time */
                                                programada?: string;
                                                /** Format: date-time */
                                                estimada?: string;
                                            };
                                            idElemento?: number;
                                            programada?: boolean;
                                        };
                                        estado?: {
                                            id?: number;
                                            nombre?: string;
                                        };
                                    };
                                    hasta?: {
                                        estacion?: {
                                            tipo?: {
                                                id?: number;
                                                nombre?: string;
                                            };
                                            anden?: {
                                                id?: number;
                                                nombre?: string;
                                            };
                                            orden?: number;
                                            tramo?: {
                                                id?: number;
                                                orden?: number;
                                            };
                                            equipo?: {
                                                id?: number;
                                                gpss?: string[];
                                                nombre?: string;
                                                esElectrico?: number;
                                            };
                                            nombre?: string;
                                            parada?: boolean;
                                            salida?: {
                                                /** Format: date-time */
                                                programada?: string;
                                                /** Format: date-time */
                                                estimada?: string;
                                            };
                                            idPunto?: number;
                                            llegada?: {
                                                /** Format: date-time */
                                                programada?: string;
                                                /** Format: date-time */
                                                estimada?: string;
                                            };
                                            idElemento?: number;
                                            programada?: boolean;
                                        };
                                        punto?: {
                                            tipo?: {
                                                id?: number;
                                                nombre?: string;
                                            };
                                            orden?: number;
                                            tramo?: {
                                                id?: number;
                                                orden?: number;
                                            };
                                            equipo?: {
                                                id?: number;
                                                gpss?: string[];
                                                nombre?: string;
                                                esElectrico?: number;
                                            };
                                            nombre?: string;
                                            parada?: boolean;
                                            salida?: {
                                                /** Format: date-time */
                                                programada?: string;
                                                /** Format: date-time */
                                                estimada?: string;
                                            };
                                            idPunto?: number;
                                            llegada?: {
                                                /** Format: date-time */
                                                programada?: string;
                                                /** Format: date-time */
                                                estimada?: string;
                                            };
                                            idElemento?: number;
                                            programada?: boolean;
                                        };
                                    };
                                    estaciones?: {
                                        tipo?: {
                                            id?: number;
                                            nombre?: string;
                                        };
                                        anden?: {
                                            id?: number;
                                            nombre?: string;
                                        };
                                        orden?: number;
                                        tramo?: {
                                            id?: number;
                                            orden?: number;
                                        };
                                        equipo?: {
                                            id?: number;
                                            nombre?: string;
                                        };
                                        nombre?: string;
                                        parada?: boolean;
                                        salida?: {
                                            /** Format: date-time */
                                            programada?: string;
                                            /** Format: date-time */
                                            ultimaHoraRegistrada?: string;
                                            /** Format: float */
                                            distancia?: number;
                                            /** Format: float */
                                            velocidad?: number;
                                            /** Format: float */
                                            latitud?: number;
                                            /** Format: float */
                                            longitud?: number;
                                            referencia?: number;
                                            /** Format: date-time */
                                            real?: string;
                                        };
                                        idPunto?: number;
                                        llegada?: Record<string, never>;
                                        idElemento?: number;
                                        programada?: boolean;
                                        segundos?: number;
                                    }[];
                                };
                            }[];
                            total?: number;
                        };
                    };
                };
                /** @description Unauthorized access */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @example 401 */
                            status: number;
                            /** @example Unauthorized */
                            message: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/public/app-estaciones/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** GET estacion by id */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A successful response containing an array of station information */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @example Plaza Constitución */
                            estacion: string;
                            /** @example Av. Brasil 1128, CABA. */
                            direccion: string;
                            /** @example 24 hs. */
                            boleteria: string;
                            /** @example Lun. a sáb. de 5 a 21 hs. Dom. y fer. de 8 a 16 hs. */
                            cap: string;
                            /** @example SI */
                            banos: string;
                            /** @example SI */
                            ascensor: string;
                            /** @example SI */
                            rampa: string;
                            /** @example SI */
                            wifi: string;
                            /** @example Lunes a viernes, de 9 a 18 hs. */
                            etb: string;
                            /** @example 4 - 9 - 10 - 12 - 17 - 28 - 39 - 45 - 46 - 51 - 53 - 59 - 60 - 61 - 62 - 65 - 67 - 70 - 79 - 84 - 91 - 95 - 96 - 97 - 98 - 100 - 102 - 129 - 133 - 134 - 143 - 148 - 151 - 154 - 168 */
                            colectivos: string;
                            /** @example Subte C (Estación Constitución) - Metrobus Sur - Estación Ecobici */
                            conexiones: string;
                            /** @example Marina */
                            relevador: string;
                            /** @example 93 */
                            estacion_id_unico: number;
                            /** @example 11 */
                            linea_id: number;
                            /** @example SI */
                            terminal_sube: string;
                        }[];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: never;
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    authorize: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    /** @example admin */
                    username: string;
                    /** @example admin */
                    password: string;
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c */
                        token?: string;
                    };
                };
            };
            /** @description Unauthorized access */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @example 401 */
                        status: number;
                        /** @example Unauthorized */
                        message: string;
                    };
                };
            };
        };
    };
    getLineas: {
        parameters: {
            query?: {
                idEmpresa?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @example 11 */
                        id: number;
                        /** @example 1 */
                        id_empresa: number;
                        /** @example Roca */
                        nombre: string;
                        estado: {
                            /** @example 13 */
                            id?: number;
                            /** @example Alertas por ramal */
                            mensaje?: string;
                            /** @example #435a6c */
                            color?: string;
                        };
                        alerta: {
                            /** @example 13 */
                            id?: number;
                            /** @example Sarmiento anda mal */
                            mensaje?: string;
                            /** @example #435a6c */
                            color?: string;
                        }[];
                    }[];
                };
            };
            /** @description Unauthorized access */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @example 401 */
                        status: number;
                        /** @example Unauthorized */
                        message: string;
                    };
                };
            };
        };
    };
}
