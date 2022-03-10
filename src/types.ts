/*
 * This file is part of ciboard

 * Copyright (c) 2021, 2022 Andrei Stepanov <astepano@redhat.com>
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

import _ from 'lodash';
import { TabsProps } from '@patternfly/react-core';

/**
 * Valid for: Version: 1.y.z
 * https://pagure.io/fedora-ci/messages/blob/master/f/schemas/brew-build.test.complete.yaml
 *
 */
export namespace MSG_V_1 {
    export type MessagesType = MessagesRPMBuildType;
    export type RPMBuildsType = 'koji-build' | 'brew-build';

    export type TestCategoryType =
        | 'system'
        | 'functional'
        | 'validation'
        | 'integration'
        | 'performance'
        | 'static-analysis'
        | 'interoperability';

    export type TestResultType =
        | 'info'
        | 'passed'
        | 'failed'
        | 'not_applicable'
        | 'needs_inspection';

    export type MsgRunType = {
        url: string;
        log: string;
        debug?: string;
        rebuild?: string;
        log_raw?: string;
        log_stream?: string;
        trigger_rebuild?: string;
    };

    export type MsgSystemType = {
        os: string;
        label?: string;
        variant?: string;
        provider: string;
        architecture: string;
    };

    export type MsgCommonType = {
        note: string;
        version: string;
        generated_at: string;
    };

    export type MsgContactType = {
        url?: string;
        irc?: string;
        name: string;
        team: string;
        docs: string;
        email: string;
        slack?: string;
        version?: string;
    };

    export type MsgRPMBuildType = {
        id: number;
        nvr: string;
        type: RPMBuildsType;
        issuer: string;
        source?: string;
        scratch: boolean;
        baseline?: string;
        component: string;
        dependencies?: Array<string>;
    };

    export type MsgStageType = {
        name: string;
    };

    export type MsgPipelineType = {
        id: string;
        name: string;
        build?: string;
        stage?: MsgStageType;
    };

    export type MsgTestCommonType = {
        type: string;
        note?: string;
        docs?: string;
        xunit?: string;
        label?: Array<string>;
        category: TestCategoryType;
        lifetime?: number;
        progress?: number;
        scenario?: string;
        namespace: string;
        xunit_urls?: Array<string>;
    };

    export type MsgTestCompleteType = {
        result: TestResultType;
        output?: string;
        runtime?: number;
        output_urls?: Array<string>;
    };

    export type MsgNotificationType = {
        recipients?: Array<string>;
    };

    export type MsgRPMBuildTestComplete = {
        run: MsgRunType;
        test: MsgTestCommonType & MsgTestCompleteType;
        system: Array<MsgSystemType>;
        version: MsgCommonType['version'];
        contact: MsgContactType;
        artifact: MsgRPMBuildType;
        pipeline: MsgPipelineType;
        generated_at: MsgCommonType['generated_at'];
        notification?: MsgNotificationType;
    };

    export type MsgErrorType = {
        reason: string;
        issue_url?: string;
    };

    export type MsgRPMBuildTestError = {
        run: MsgRunType;
        test: MsgTestCommonType;
        error: MsgErrorType;
        version: MsgCommonType['version'];
        contact: MsgContactType;
        artifact: MsgRPMBuildType;
        pipeline: MsgPipelineType;
        generated_at: MsgCommonType['generated_at'];
        notification?: MsgNotificationType;
    };

    export type MsgRPMBuildTestQueued = {
        run: MsgRunType;
        test: MsgTestCommonType;
        contact: MsgContactType;
        version: MsgCommonType['version'];
        artifact: MsgRPMBuildType;
        pipeline: MsgPipelineType;
        generated_at: MsgCommonType['generated_at'];
    };

    export type MsgRPMBuildTestRunning = {
        run: MsgRunType;
        test: MsgTestCommonType;
        contact: MsgContactType;
        version: MsgCommonType['version'];
        artifact: MsgRPMBuildType;
        pipeline: MsgPipelineType;
        generated_at: MsgCommonType['generated_at'];
    };

    export type MessagesRPMBuildType =
        | MsgRPMBuildTestComplete
        | MsgRPMBuildTestError
        | MsgRPMBuildTestQueued
        | MsgRPMBuildTestRunning;

    export function isMsg(msg: BrokerMessagesType): msg is MessagesType {
        return _.some(
            ['0.2.', '1.'],
            _.flow(_.identity, _.partial(_.startsWith, msg.version)),
        );
    }
}

/**
 * Valid for: Version: 0.1.z
 * https://pagure.io/fedora-ci/messages/blob/e3f4758ff5a0948cceb09d0b214690351e453e7c/f/schemas/brew-build.test.complete.yaml
 */
export namespace MSG_V_0_1 {
    export type MessagesType = MessagesRPMBuildType;

    export type RPMBuildsType = 'koji-build' | 'brew-build';
    export type ArtifactNameType =
        | 'brew-build'
        | 'koji-build'
        | 'copr-build'
        | 'redhat-module'
        | 'productmd-compose';

    export type TestResultType =
        | 'info'
        | 'passed'
        | 'failed'
        | 'not_applicable'
        | 'needs_inspection';

    export type TestCategoryType =
        | 'system'
        | 'functional'
        | 'validation'
        | 'integration'
        | 'performance'
        | 'static-analysis'
        | 'interoperability';

    export type MessagesRPMBuildType =
        | MsgRPMBuildTestComplete
        | MsgRPMBuildTestError
        | MsgRPMBuildTestQueued
        | MsgRPMBuildTestRunning;

    export type MsgRPMBuildTestComplete = {
        ci: MsgContactType;
        run: MsgRunType;
        artifact: MsgRPMBuildType;
        system: Array<MsgSystemType>;
        docs: string;
        category: TestCategoryType;
        type: string;
        label: string;
        status: TestResultType;
        web_url: string;
        xunit: string;
        recipients: Array<string>;
        thread_id: string;
        namespace: string;
        note: string;
        generated_at: number;
        version: string;
    };

    export type MsgRPMBuildTestError = {
        ci: MsgContactType;
        run: MsgRunType;
        artifact: MsgRPMBuildType;
        docs: string;
        category: TestCategoryType;
        type: string;
        label: string;
        reason: string;
        issue_url: string;
        recipients: Array<string>;
        thread_id: string;
        namespace: string;
        note: string;
        generated_at: number;
        version: string;
    };

    export type MsgRPMBuildTestQueued = {
        ci: MsgContactType;
        run: MsgRunType;
        artifact: MsgRPMBuildType;
        category: TestCategoryType;
        type: string;
        label: string;
        thread_id: string;
        namespace: string;
        note: string;
        generated_at: number;
        version: string;
    };

    export type MsgRPMBuildTestRunning = {
        ci: MsgContactType;
        run: MsgRunType;
        artifact: MsgRPMBuildType;
        category: TestCategoryType;
        type: string;
        label: string;
        lifetime: number;
        thread_id: string;
        namespace: string;
        note: string;
        progress: number;
        generated_at: number;
        version: string;
    };

    export type MsgContactType = {
        name: string;
        team: string;
        docs: string;
        email: string;
        url?: string;
        irc?: string;
        environment?: 'production' | 'stage';
        version?: string;
    };

    export type MsgRunType = {
        url: string;
        log: string;
        log_raw?: string;
        log_stream?: string;
        rebuild?: string;
        debug?: string;
        additional_urls?: {};
    };

    export type MsgRPMBuildType = {
        type: RPMBuildsType;
        id: number;
        component: string;
        issuer: string;
        scratch: boolean;
        nvr: string;
        baseline?: string;
        dependencies?: Array<string>;
        source?: string;
    };

    export type MsgSystemType = {
        os: string;
        provider: string;
        architecture: string;
        variant?: string;
        label?: string;
    };

    export function isMsg(msg: BrokerMessagesType): msg is MessagesType {
        return msg.version.startsWith('0.1.');
    }
}

export type BrokerMessagesType = MSG_V_0_1.MessagesType | MSG_V_1.MessagesType;

export type TabClickHandlerType = Extract<TabsProps['onSelect'], Function>;

export interface SSTItem {
    display_name: string;
    name: string;
    releases: string[];
}

export interface SSTResult {
	artifact: {
        id: number;
        url: string;
    };
	assignee: string;
	gating_bug?: {
        text: string;
        url: string;
    };
	gating_yaml_url?: string;
	log_urls?: string[];
	metadata_url: string;
	nvr: string;
	rebuild_url?: string;
	sortKey: string;
    status: string;
    tag: string;
	testcase: {
		category: string;
		namespace: string;
		type: string;
	};
	time: string;
}