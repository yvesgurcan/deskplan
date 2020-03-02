import React, { Fragment, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Error from './Shared.Error';
import Checkbox from './Shared.Checkbox';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default () => {
    const [offlineAccess, setOfflineAccess] = useState(false);
    const [offline, setOffline] = useState(!navigator.onLine);
    const prevOffline = usePrevious(offline);

    useEffect(() => {
        async function getOfflineAccess() {
            const workerRegistered = await navigator.serviceWorker
                .getRegistrations()
                .then(function(reg) {
                    return reg.length > 0;
                });
            setOfflineAccess(workerRegistered || false);
        }

        window.addEventListener('offline', () => {
            setOffline(true);
        });
        window.addEventListener('online', () => {
            setOffline(false);
        });

        getOfflineAccess();
    }, []);
    return (
        <Fragment>
            <Error
                error={
                    offline ? (
                        <div>
                            You're offline.{' '}
                            {offlineAccess
                                ? 'You can continue to use the application but changes will not be saved.'
                                : 'You will not be able to access the application if you reload the page.'}
                        </div>
                    ) : prevOffline ? (
                        <div>You're back online!</div>
                    ) : null
                }
            ></Error>
            {navigator.onLine && (
                <OfflineAccess>
                    <Checkbox
                        checked={offlineAccess}
                        onChange={() => {
                            const updatedOfflineAccess = !offlineAccess;
                            if (updatedOfflineAccess) {
                                navigator.serviceWorker.register(
                                    '/service-worker.js'
                                );
                            } else {
                                navigator.serviceWorker
                                    .getRegistrations()
                                    .then(function(registrations) {
                                        for (let registration of registrations) {
                                            registration.unregister();
                                        }
                                    });
                            }
                            setOfflineAccess(updatedOfflineAccess);
                        }}
                    >
                        Enable offline access
                    </Checkbox>
                </OfflineAccess>
            )}
        </Fragment>
    );
};

const OfflineAccess = styled.div`
    text-align: right;
    padding-right: 1rem;
`;
