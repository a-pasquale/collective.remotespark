from plone.app.testing import PloneWithPackageLayer
from plone.app.testing import IntegrationTesting
from plone.app.testing import FunctionalTesting

import collective.remotespark


COLLECTIVE_REMOTESPARK = PloneWithPackageLayer(
    zcml_package=collective.remotespark,
    zcml_filename='testing.zcml',
    gs_profile_id='collective.remotespark:testing',
    name="COLLECTIVE_REMOTESPARK")

COLLECTIVE_REMOTESPARK_INTEGRATION = IntegrationTesting(
    bases=(COLLECTIVE_REMOTESPARK, ),
    name="COLLECTIVE_REMOTESPARK_INTEGRATION")

COLLECTIVE_REMOTESPARK_FUNCTIONAL = FunctionalTesting(
    bases=(COLLECTIVE_REMOTESPARK, ),
    name="COLLECTIVE_REMOTESPARK_FUNCTIONAL")
