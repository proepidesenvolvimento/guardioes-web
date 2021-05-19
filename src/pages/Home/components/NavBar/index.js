/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Container,
  OptionButton,
  OptionsSection,
  OptionName
} from './styles';
import { connect } from 'react-redux';
import {
  setAdminCategories
} from 'actions/';
import { bindActionCreators } from 'redux';

const NavBar = ({ 
  user,
  setComponentCallback
 }) => {

  const [categories, setCategories] = useState([])
  const [selected, setSelected] = useState("")

  const allCategories = [
    {
      key: "dashboard",
      value: "Visualizações"
    },
    {
      key: "admins",
      value: "Admins"
    },
    {
      key: "configApps",
      value: "Configurar Apps"
    },
    {
      key: "managers",
      value: "Gerentes"
    },
    {
      key: "managersGroup",
      value: "Gerentes de Instituições"
    },
    {
      key: "symptoms",
      value: "Sintomas"
    },
    {
      key: "syndromes",
      value: "Síndromes"
    },
    {
      key: "contents",
      value: "Conteúdos"
    },
    {
      key: "users",
      value: "Usuários"
    },
    {
      key: "profile",
      value: "Conta"
    },
    {
      key: "groups",
      value: "Instituições"
    },
    {
      key: "vigilance",
      value: "Vigilância Ativa"
    },
    {
      key: "godata",
      value: "GoData"
    }
  ];

  const loadCategories = () => {
    let categories = allCategories.slice(0, 1);

    if (user.type === "admin") {
      if (user.is_god === true) {
        categories = categories.concat(allCategories.slice(1, -3));
      }
      else {
        categories = categories.concat(allCategories.slice(3, -2));
      }
    } else if (user.type === "manager") {
      categories = categories.concat(allCategories.slice(5, -3));
    } else if (user.type === "group_manager") {
      categories = categories.concat(allCategories.slice(8));
    } else if (user.type === "city_manager") {
      categories = categories.concat(allCategories.slice(8, 10));
    }

    setCategories(categories)
    setSelected(categories[0].key)
    setComponentCallback(categories[0])
  }

  useEffect(() => {
    loadCategories()
  }, [user.type]);

  return (
    <Container>
      <OptionsSection>
        {categories.map(category => {
          return (
            <OptionButton
              onClick={() => {
                setSelected(category.key)
                setComponentCallback(category)
              }}
              selected={selected === category.key ? true : false}
            >
              <OptionName>
                {category.value}
              </OptionName>
            </OptionButton>
          );
        })}
      </OptionsSection>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  token: state.user.token,
  user: state.user.user,
  admin_categories: state.user.admin_categories
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setAdminCategories
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar); 
