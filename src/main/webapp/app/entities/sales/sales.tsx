import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import ProductListTable from '../components/ProductListTable/ProductListTable';

export interface ISalesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }
export const Sales = (props: ISalesProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { salesList, match, loading } = props;
  return (
    <div>
      <ProductListTable salesList={salesList} match={match} loading={loading} />
    </div>
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesList: sales.entities,
  loading: sales.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
