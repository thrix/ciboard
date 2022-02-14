/*
 * This file is part of ciboard

 * Copyright (c) 2021 Andrei Stepanov <astepano@redhat.com>
 * 
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import * as React from 'react';
import { TextContent, Text } from '@patternfly/react-core';
import PageCommon from './PageCommon';

const Help = () => (
    <TextContent>
        <Text component="h1">Welcome to CI Dashboard!</Text>
        <Text component="p">
            CI Dashboard displays details of testing events, which happened for
            the supported artifacts. As the source of information it uses the{' '}
        </Text>
        <a href="https://docs.google.com/document/d/16L5odC-B4L6iwb9dp8Ry0Xk5Sc49h9KvTHrG86fdfQM">
            Factory 2.0 CI UMB messages
        </a>{' '}
        consumed from the Unified Message Bus (UMB). Currently it makes it
        possible to discover testing events only.
        <h2>Supported artifacts</h2>
        The dashboard currently supports these artifacts
        <ul>
            <li>
                Brew rpm builds - builds from the{' '}
                <a href="https://brewweb.engineering.redhat.com">
                    Brew build system
                </a>
            </li>
            <li>
                Koji rpm builds - builds from the{' '}
                <a href="https://koji.fedoraproject.org/koji">
                    Koji build system
                </a>
            </li>
            <li>
                Copr builds - build from the{' '}
                <a href="https://copr.devel.redhat.com">
                    internal Copr build system
                </a>{' '}
                or{' '}
                <a href="https://copr.fedorainfracloud.org">
                    Fedora Copr build system
                </a>
            </li>
            <li>
                Red Hat modules - build from{' '}
                <a href="http://mbsweb.engineering.redhat.com">
                    Module Build Service
                </a>
            </li>
            <li>
                Productmd composes - build from{' '}
                <a href="http://mbsweb.engineering.redhat.com">
                    Module Build Service
                </a>
            </li>
        </ul>
        <h2>Search</h2>
        <h3>Via menu</h3>
        <p>
            The dashboard provides a simple interface for searching. Currently
            you can search only by artifact name. The name is dependent on the
            type of the artifact. For Brew/Koji rpm builds and Red Hat modules
            the search value is the component name. For Copr builds the artifact
            name consists from the repository name plus the package, e.g.
            @ksh/latest/ksh.
        </p>
        <h3>Via URL</h3>
        <p>The dashboard provides advanced search via URL:</p>
        <p className="padding-left-20">
            {window.location.origin}
            /#/artifact/ARTIFACT_NAME/FIELD/VALUE[,VALUE,...]?FIELD=VALUE
            {'&'}
            FIELD=VALUE
            {'&'}
            ...
        </p>
        <h4>Examples</h4>
        <p>
            Search all artifacts of build issuers plautrba and lvrabec,
            non-scratch only
        </p>
        <p className="padding-left-20">
            <a
                href={`${window.location.origin}/#/artifact/brew-build/issuer/plautrba,lvrabec?scratch=false`}
            >
                {window.location.origin}
                /#/artifact/brew-build/issuer/plautrba,lvrabec?scratch=false
            </a>
        </p>
        <p>Search events for modules with name httpd, nginx and llvm-toolset</p>
        <p className="padding-left-20">
            <a
                href={`${window.location.origin}/#/artifact/redhat-module/name/httpd,nginx,llvm-toolset`}
            >
                {window.location.origin}
                /#/artifact/redhat-module/name/httpd,nginx,llvm-toolset
            </a>
        </p>
        <h4>Possible values for ARTIFACT_NAME</h4>
        <ul>
            <li>brew-build</li>
            <li>copr-build</li>
            <li>koji-build</li>
            <li>redhat-module</li>
        </ul>
        <h4>Possible fields and values</h4>
        <table style={{ width: '100%' }}>
            <tbody>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>aid</td>
                    <td>
                        An integer. Specifies the artifact ID. Dependent on
                        artifact type:
                        <ul>
                            <li>brew-build, koji build - task ID</li>
                            <li>redhat-module - module build ID</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>component</td>
                    <td>
                        Name of the component, applicable for artifacts
                        brew-build, koji-build and copr-build.
                    </td>
                </tr>
                <tr>
                    <td>name</td>
                    <td>
                        Name of the module, applicable for artifact
                        redhat-module only.
                    </td>
                </tr>
                <tr>
                    <td>nvr</td>
                    <td>
                        NVR of the rpm build, applicable for artifact brew-build
                        and koji-build.
                    </td>
                </tr>
                <tr>
                    <td>nsvc</td>
                    <td>
                        NSVC of the module build, applicable for artifact
                        redhat-module.
                    </td>
                </tr>
                <tr>
                    <td>owner</td>
                    <td>
                        Name of the owner of the artifact, usually who built it.
                    </td>
                </tr>
                <tr>
                    <td>scratch</td>
                    <td>
                        Boolean - true or false. Applicable only for brew build
                        and koji-build.
                    </td>
                </tr>
            </tbody>
        </table>
        <h2>Integrations</h2>
        <p>
            Dashboard can be integrated with Brew web interfaces and Errata Tool
            by using a{' '}
            <a href="https://gitlab.cee.redhat.com/greasemonkey/ci-dashboard-integration/raw/master/ci-dashboard-integration.user.js">
                Greasmonkey/Tampermonkey script in your browser.
            </a>
        </p>
        <p>
            To enable it, install Greasmonkey or Tempermonkey extensions to your
            browser and enable the above script. Bellow are example pictures how
            does the integration look like.
        </p>
        <h3>Integration with Brew</h3>
        <p>
            The dashboard is currently integrated on the build info or task info
            pages.
        </p>
        <img
            src="/integration-brew.png"
            alt="Example of integration with Brew"
            className="integrations"
        />
        <h3>Integration with Errata Tool</h3>
        <p>
            For any Erratum you should see CI Dashobard section on the summary
            page.
        </p>
        <img
            src="/integration-errata.png"
            alt="Example of integration with Errata Tool"
            className="integrations"
        />
        <h3>Integration with Module Build Service</h3>
        <p>
            In the MBS web interface, on a module specific page, you should see
            CI Dashboard section.
        </p>
        <img
            src="/integration-mbs.png"
            alt="Example of integration with MBS"
            className="integrations"
        />
        <h2>Onboarding</h2>
        <p>
            To onboard your system to the dashboard, just start sending out
            messages in the Factory 2.0 CI UMB messages format to the specified
            virtual topic namespace. In case of any questions, see Contacts.
        </p>
        <h2>Development / Contribution</h2>
        <p>
            Dashboard is built using React.js, Patternfly and other JS goodies.
        </p>
        <p>
            The project is currently developed on {"CEE's"} gitlab.
            Contributions are always welcome.
        </p>
        <p className="padding-left-20">
            <a href="https://gitlab.cee.redhat.com/osci/ci-dashboard">
                https://gitlab.cee.redhat.com/osci/ci-dashboard
            </a>
        </p>
        <p>
            {"Dashboard's"} backend - Kai - is developed separately. You can
            find the code here:
        </p>
        <p className="padding-left-20">
            <a href="https://gitlab.cee.redhat.com/baseos-qe/kai">
                https://gitlab.cee.redhat.com/baseos-qe/kai
            </a>
        </p>
        <h2>Contacts</h2>
        <p>IRC: #osci or #baseosci</p>
        <p>Mailing list: osci-list@redhat.com baseos-ci@redhat.com</p>
    </TextContent>
);

const PageHelp = () => {
    return (
        <PageCommon>
            <Help />
        </PageCommon>
    );
};

export default PageHelp;