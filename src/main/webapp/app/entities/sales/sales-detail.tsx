import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import ViewProduct from '../components/ViewProduct/ViewProduct';

export interface ISalesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id?: string }> { }

export const SalesDetail = (props: ISalesDetailProps) => {
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    props.getEntity(props.match.params.id);
    setLoading(false);
  }, []);

  const { salesEntity } = props;
  return (
    <ViewProduct salesEntity={salesEntity} loading={loading} />
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesEntity: sales.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalesDetail);
