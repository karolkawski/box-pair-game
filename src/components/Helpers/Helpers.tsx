import { GroundHelper } from './GroundHelper';
import { AxesHelper } from './AxesHelper';
import { DirectionalLightHelper } from './DirectionalLightHelper';

export const Helpers = () => {
  return (
    <>
      <DirectionalLightHelper />
      <GroundHelper />
      <AxesHelper />
    </>
  );
};
