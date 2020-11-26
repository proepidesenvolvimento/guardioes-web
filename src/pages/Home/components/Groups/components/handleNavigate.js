import { useState } from 'react';
import { setGroups} from 'actions/';

const [courses] = useState([]);
const [country] = useState({});
const [state, setState] = useState({});
const [countie, setCountie] = useState({});
const [goBack, setGoBack] = useState(false);

const handleNavigate = (group, goback=false) => {

    if (group.type === "Estado" && goback === false)
      setGoBack(true)

    if (group.type === "Município" && goback === true) {
      setGoBack(false)
      setGroups(states.filter((state) => state.parent.name === country.description))
      return
    }

    switch(group.type) {
      case "Estado":
        if (!goback) {
          const aux_groups = counties.filter((countie) => countie.parent.name === group.description)
          if (aux_groups.length === 0)
            return alert("O grupo não possui filhos")
          setGroups(aux_groups)
          setState(group)
        }
        break;
      case "Município":
        if (goback) {
          setGroups(states.filter((state) => state.parent.name === country.description))
          setCountie({})
        } else {
          const aux_groups = schools.filter((school) => school.parent.name === group.description)
          if (aux_groups.length === 0)
            return alert("O grupo não possui filhos")
          setGroups(aux_groups)
          setCountie(group)
        }
        break;
      case "Instituição":
        if (goback) {
          setGroups(counties.filter((countie) => countie.parent.name === state.description))
        } else {
          const aux_groups = courses.filter((course) => course.parent.name === group.description)
          if (aux_groups.length === 0)
            return alert("O grupo não possui filhos")
          setGroups(aux_groups)
        }
        break;
      case "Curso":
        if (goback) {
          setGroups(schools.filter((school) => school.parent.name === countie.description))
        }
        break;
      default:
        break;
    }
}

export default handleNavigate;