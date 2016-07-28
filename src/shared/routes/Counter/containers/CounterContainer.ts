import { connect } from 'react-redux';
import { increment, doubleAsync } from '../modules/counter';
import reducer from '../modules/counter';
import Counter from '../../../components/Counter';

export const mapActionCreators = {
  increment: () => increment(1),
  doubleAsync,
};

const mapStateToProps = (state) => ({
  counter: state.counter,
});

(Counter as any).injectReducer = { key: 'counter', reducer };

export default connect(mapStateToProps, mapActionCreators as any)(Counter);
