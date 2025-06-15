function getUserDataField() {
  const data = localStorage.getItem("userData");
  const parsedData = data ? JSON.parse(data) : null;
  const branches = parsedData.branches.map((p: any) => ({
    value: p.id,
    label: p.name,
    key: p.id,
  }));
  const currencies = parsedData.currencies.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  const default_branche = parsedData.default_branche
    ? {
      value: parsedData.default_branche.id,
      label: parsedData.default_branche.name,
    }
    : null;
  const default_season = parsedData.default_season
    ? {
      value: parsedData.default_season.id,
      label: parsedData.default_season.name,
    }
    : null;
  const payment_methods = parsedData.payment_methods.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const seasons = parsedData.seasons.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  const me = parsedData.me
    ? {
      value: parsedData.me.id,
      label: parsedData.me.first_name,
      role_id: parsedData.me.role_id,
    }
    : null;
  return {
    branches,
    currencies,
    default_branche,
    default_season,
    payment_methods,
    seasons,
    me,
  };
}

export default getUserDataField;
