import moment from "moment";

const yearsArray = () => {
    const currentYear = moment().year();
    let startYear = currentYear - 30;
    let result = [{ value: "", label: "Año" }];
    while (startYear <= currentYear) {
        result.push({ value: `${startYear++}`, label: `${startYear++}` });
    }
    return result;
};

export const years = yearsArray();

export const types = [
    { value: "", label: "Seleccione un tipo" },
    { value: "Vehículo Turbo", label: "Vehículo Turbo" },
    { value: "Camión Sencillo", label: "Camión Sencillo" },
    { value: "Doble Troque", label: "Doble Troque" },
    { value: "Cuatro Manos", label: "Cuatro Manos" },
    { value: "Minimula", label: "Minimula" },
    { value: "Tractomula 2 Troques", label: "Tractomula 2 Troques" },
    { value: "Tractomula 3 Troques", label: "Tractomula 3 Troques" },
];
